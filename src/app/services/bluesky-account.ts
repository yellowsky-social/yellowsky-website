import { AtpSessionData, AtpSessionEvent, BskyAgent } from '@atproto/api';

export const BLUESKY_ENDPOINT = 'https://bsky.social';

async function loginBluesky(handle: string, password: string): Promise<any> {
  const agent = new BskyAgent({
    service: 'https://example.com',
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
      // store the session-data for reuse
    },
  });
  agent.setPersistSessionHandler((evt, session) => {
    // Store session into storage
  });

  await agent.login({ identifier: 'alice@mail.com', password: 'hunter2' });


}