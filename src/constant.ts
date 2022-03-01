export const headers: Record<string, string> = {
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'accept-encoding': 'gzip, deflate, br',
  'cache-control': 'max-age=0',
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36',
};

export enum SlackStatusType {
  NoIssue = 'NoIssue',
  Maintenance = 'Maintenance',
  Notice = 'Notice',
  Incident = 'Incident',
  Outage = 'Outage',
}
