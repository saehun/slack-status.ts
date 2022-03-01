import { slackStatusIconUrl, SlackStatusType } from './constant';
import { SlackStatusParseError } from './error';
import { SlackServiceDomain, SlackStatus } from './types';

export function parseSlackStatus(html: string): SlackStatus {
  validateHtml(html);
  const section = parseSection(html);
  const message = parseMessage(html);
  const statusItems = parseStatusItems(section);

  return {
    message,
    ...statusItems,
  };
}

function validateHtml(html: string): void {
  // TODO - ensure html is from status.slack.com
  return;
}

function parseSection(html: string): string {
  const sectionStart = indexOf(html, `<div id="services"`);
  const sectionEnd = indexOf(html, `<div id="recent_incidents_legend"`);
  return html.slice(sectionStart.index, sectionEnd.index);
}

function parseMessage(html: string): string {
  const currentStatus = indexOf(html, `<div id="current_status"`);
  const h1OpenTagStart = indexOf(currentStatus.substring, '<h1');
  const h1OpenTagClose = indexOf(h1OpenTagStart.substring, '>', { part: 'end' });
  const h1CloseTagStart = indexOf(h1OpenTagClose.substring, '</h1>');
  return h1OpenTagClose.substring.slice(1, h1CloseTagStart.index);
}

function parseStatusItems(section: string): Record<SlackServiceDomain, SlackStatusType> {
  const keys: SlackServiceDomain[] = [
    'Login/SSO',
    'Connections',
    'Messaging',
    'Link Previews',
    'Posts/Files',
    'Notifications',
    'Calls',
    'Search',
    'Apps/Integrations/APIs',
    'Workspace/Org Administration',
  ];
  const parsedIndexes = Array.from(regExpParseAll(section, /<div class="service/g)).map(parsed => parsed.index);

  return keys.reduce((statusItems, key, nth) => {
    return { ...statusItems, [key]: parseItem(key, nth) };
  }, {} as Record<SlackServiceDomain, SlackStatusType>);

  function parseItem(key: string, nth: number): SlackStatusType {
    const startIndex = parsedIndexes[nth];
    const endIndex = parsedIndexes[nth + 1] ?? section.length;
    const sectionHtml = section.slice(startIndex, endIndex);
    if (!sectionHtml.includes(key)) {
      throw new SlackStatusParseError(`Cannot find '${key}' in section:\n${sectionHtml}`);
    } else if (sectionHtml.includes(slackStatusIconUrl[SlackStatusType.NoIssue])) {
      return SlackStatusType.NoIssue;
    } else if (sectionHtml.includes(slackStatusIconUrl[SlackStatusType.Maintenance])) {
      return SlackStatusType.Maintenance;
    } else if (sectionHtml.includes(slackStatusIconUrl[SlackStatusType.Notice])) {
      return SlackStatusType.Notice;
    } else if (sectionHtml.includes(slackStatusIconUrl[SlackStatusType.Incident])) {
      return SlackStatusType.Incident;
    } else if (sectionHtml.includes(slackStatusIconUrl[SlackStatusType.Outage])) {
      return SlackStatusType.Outage;
    } else {
      throw new SlackStatusParseError(`Cannot find status icon pattern in section:\n${sectionHtml}`);
    }
  }
}

/**
 * utils
 */
export function indexOf(
  str: string,
  pattern: string | RegExp,
  { startAt = 0, part = 'start' }: { startAt?: number; part?: 'start' | 'end' } = {}
): { index: number; substring: string } {
  const source = str.slice(startAt);
  const searchedIndex = source.search(pattern);
  if (searchedIndex === -1) {
    throw new SlackStatusParseError(`Cannot find ${pattern} from HTML`);
  }
  let index: number;
  if (part === 'start') {
    index = searchedIndex;
  } else {
    if (typeof pattern === 'string') {
      index = searchedIndex + startAt - 1 + pattern.length;
    } else {
      index = searchedIndex + startAt - 1 + ensureParsed(source, pattern)[0].length;
    }
  }

  return {
    index,
    substring: str.slice(index),
  };
}

/**
 * utils
 */
export function* regExpParseAll(source: string, regex: RegExp): Iterable<RegExpExecArray> {
  if (!regex.global) {
    throw new SlackStatusParseError(`Cannot parseAll with non global regex: ${regex}`);
  }
  let parsed: RegExpExecArray | null = regex.exec(source);
  while (parsed) {
    yield parsed;
    parsed = regex.exec(source);
  }
}

/**
 * utils
 */
function ensureParsed(source: string, regex: RegExp) {
  const parsed = regex.exec(source);
  if (parsed == null) {
    throw new SlackStatusParseError(`Cannot parse with Regex: ${regex}`);
  }
  return parsed;
}

/**
 * export for test
 */
export const __test__ = {
  indexOf,
  validateHtml,
  parseSection,
  parseMessage,
  parseStatusItems,
};
