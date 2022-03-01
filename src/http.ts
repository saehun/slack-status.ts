import { ClientRequest, IncomingMessage, RequestOptions } from 'http';
import * as https from 'https';
import { headers } from './constant';
import { SlackStatusNetworkError } from './error';

async function fetch(option: RequestOptions): Promise<{ request: ClientRequest; response: IncomingMessage }> {
  return new Promise(resolve => {
    const request = https
      .request(option, response => {
        resolve({ request, response });
      })
      .end();
  });
}

export async function fetchSlackStatusPage() {
  const { request, response } = await fetch({
    method: 'GET',
    hostname: 'status.slack.com',
    port: 443,
    timeout: 15_000,
    headers,
  });
  const html: string[] = [];

  return new Promise<string>((resolve, reject) => {
    if (response.statusCode !== 200) {
      reject(new SlackStatusNetworkError(response.statusCode));
    }
    request.on('error', error => {
      reject(error);
    });
    response.on('error', error => {
      reject(error);
    });
    response.on('data', chunk => {
      html.push(chunk);
    });
    response.on('end', () => {
      resolve(html.join(''));
    });
  });
}
