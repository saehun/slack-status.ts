# slack-status.ts
Retrieve slack status via HTTP with zero dependency

![slack-screenshot](./slack.png)

## Installation
```shell
yarn add slack-status.ts
```

## Usage
```ts
import { fetchSlackStatus } from 'slack-status.ts';

fetchSlackStatus().then(console.log);

// {
//   message: 'Slack is up and running',
//   'Login/SSO': 'NoIssue',
//   Connections: 'NoIssue',
//   Messaging: 'NoIssue',
//   'Link Previews': 'NoIssue',
//   'Posts/Files': 'NoIssue',
//   Notifications: 'NoIssue',
//   Calls: 'NoIssue',
//   Search: 'NoIssue',
//   'Apps/Integrations/APIs': 'NoIssue',
//   'Workspace/Org Administration': 'NoIssue'
// }
```

## APIs
TBD
