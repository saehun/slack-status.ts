import { SlackStatusType } from './constant';
import { SlackServiceDomain, SlackStatus } from './types';

export function parseSlackStatus(html: string): SlackStatus {
  validateHtml(html);
  const section = parseSection(html);
  const message = parseMessage(html);
  const keys: SlackServiceDomain[] = [
    'Login/SSO',
    'Connections',
    'Messaging',
    'Link Previews',
    'Posts/Files',
    'Notifications',
    'Calls',
    'Search',
    'Search',
    'Apps/Integrations/APIs',
    'Workspace/Org Administration',
  ];

  const statusItems: Record<SlackServiceDomain, SlackStatusType> = keys.reduce((statusItems, key, index) => {
    return { ...statusItems, [key]: parseDomainItems(section, key, index) };
  }, {} as Record<SlackServiceDomain, SlackStatusType>);

  return {
    message,
    ...statusItems,
  };
}

function validateHtml(html: string): void {
  return;
}

function parseSection(html: string): string {
  return '';
}

function parseMessage(html: string): string {
  return '';
}

function parseDomainItems(section: string, key: string, index: number): string {
  return '';
}
