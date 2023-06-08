import { BskyAgent } from '@atproto/api';

export const BLUESKY_ENDPOINT = 'https://bsky.social';

export async function loginBluesky(handle: string, password: string): Promise<void> {
  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });
  agent.setPersistSessionHandler((evt, session) => {
    if (session) {
      sessionStorage.setItem('_session', JSON.stringify(session));
    }
  });
  try {
    await agent.login({ identifier: handle, password: password });
  } catch (error) {
    return Promise.reject(error + '');
  }
}

export async function logoutBluesky() {
  sessionStorage.removeItem('_session');
}

export function isLoggedIntoBluesky() {
  return (!!sessionStorage.getItem('_session'));
}