import { fetchSlackStatusPage } from './http';
import { parseSlackStatus } from './parser';
import { SlackStatus } from './types';

export * from './error';
export * from './types';
export { SlackStatusType } from './constant';

function createSlackStatusFetcher(fetchHtml: () => Promise<string>, parse: (html: string) => SlackStatus) {
  return () => fetchHtml().then(parse);
}

/**
 * Fetch slack status from `status.slack.com`
 */
const fetchSlackStatus = createSlackStatusFetcher(fetchSlackStatusPage, parseSlackStatus);

export { fetchSlackStatus };
export default fetchSlackStatus;
