export class SlackStatusNetworkError extends Error {
  constructor(public readonly statusCode?: number) {
    super(`status.slack.com response with status code: ${statusCode}`);
  }
}

export class SlackStatusParseError extends Error {
  constructor(public readonly reason: string) {
    super(`Failed to parse status.slack.com html, Maybe the page is changed.\nReason: ${reason}`);
  }
}
