import { SlackStatusType } from './constant';

export type SlackServiceDomain =
  | 'Login/SSO'
  | 'Connections'
  | 'Messaging'
  | 'Link Previews'
  | 'Posts/Files'
  | 'Notifications'
  | 'Calls'
  | 'Search'
  | 'Apps/Integrations/APIs'
  | 'Workspace/Org Administration';

export type SlackStatus = { message: string } & Record<SlackServiceDomain, SlackStatusType>;
