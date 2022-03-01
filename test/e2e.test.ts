import { fetchSlackStatus, SlackStatusType } from '../src/index';
const isCI = require('is-ci');

const runE2E = isCI ? test.skip : test;

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOneOf(items: Array<any>): CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeOneOf(received: any, items: Array<any>) {
    const pass = items.includes(received);
    const message = () => `expected ${received} to be contained in array [${items}]`;
    if (pass) {
      return {
        message,
        pass: true,
      };
    }
    return {
      message,
      pass: false,
    };
  },
});

runE2E('fetch slack status', async () => {
  const status = await fetchSlackStatus();
  const statusTypes = Object.keys(SlackStatusType);
  console.log(status);
  expect(status.message).toBeTruthy();
  expect(status['Login/SSO']).toBeOneOf(statusTypes);
  expect(status['Connections']).toBeOneOf(statusTypes);
  expect(status['Messaging']).toBeOneOf(statusTypes);
  expect(status['Posts/Files']).toBeOneOf(statusTypes);
  expect(status['Notifications']).toBeOneOf(statusTypes);
  expect(status['Calls']).toBeOneOf(statusTypes);
  expect(status['Search']).toBeOneOf(statusTypes);
  expect(status['Apps/Integrations/APIs']).toBeOneOf(statusTypes);
  expect(status['Workspace/Org Administration']).toBeOneOf(statusTypes);
});
