import { AtpSessionData, BskyAgent } from '@atproto/api';

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

export function logoutBluesky() {
  sessionStorage.removeItem('_session');
}

export async function isLoggedIntoBluesky() {
  try {
    const sessionJson = sessionStorage.getItem('_session');
    if (!sessionJson) {
      return false;
    }

    const savedSessionData: AtpSessionData = JSON.parse(sessionJson);
    const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });

    const sessionResponse = await agent.resumeSession(savedSessionData);
    return sessionResponse.success;
  } catch (e) {
    logoutBluesky();
    return Promise.reject('Session expired');
  }
}