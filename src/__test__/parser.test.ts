import { __test__ } from '../parser';
import * as fs from 'fs';
import { SlackStatusParseError } from '../error';

describe('parser', () => {
  const html = fs.readFileSync(require.resolve('./data/slack.response.html'), 'utf-8');

  it('indexOf works', () => {
    expect(__test__.indexOf('foo bar', 'foo').index).toEqual(0);
    expect(__test__.indexOf('foo bar', 'foo', { part: 'end' }).index).toEqual(2);
    expect(__test__.indexOf('foo bar', /b../).index).toEqual(4);
    expect(__test__.indexOf('foo bar', /b../, { part: 'end' }).index).toEqual(6);
    expect(() => __test__.indexOf('foo bar', 'baz')).toThrow(SlackStatusParseError);
  });

  it('parseMessage works', async () => {
    const message = __test__.parseMessage(html);
    expect(message).toEqual('Slack is up and running');
  });

  it('parseSection works', async () => {
    const section = __test__.parseSection(html);
    expect(section).toHaveLength(4500);
  });

  it('parseStatusItems works', async () => {
    const section = __test__.parseSection(html);
    const items = __test__.parseStatusItems(section);
    expect(items).toEqual({
      'Login/SSO': 'NoIssue',
      Connections: 'NoIssue',
      Messaging: 'NoIssue',
      'Link Previews': 'NoIssue',
      'Posts/Files': 'NoIssue',
      Notifications: 'NoIssue',
      Calls: 'NoIssue',
      Search: 'NoIssue',
      'Apps/Integrations/APIs': 'NoIssue',
      'Workspace/Org Administration': 'NoIssue',
    });
  });
});
