import { AtpSessionData, AtpSessionEvent, BskyAgent } from '@atproto/api';
import { AppBskyFeedPost } from '@atproto/api/src/client';
import { BoardPost } from '@/src/app/imageboard/types/content-types';

function handle(event: Event) {
  // @ts-ignore
  let file = (event.target as HTMLInputElement).files[0];

}

async function fetchLatestImage(): Promise<BoardPost[]> {
  return [];
}

async function fetchImages() {
  const agent = new BskyAgent({
    service: 'https://example.com',
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
      // store the session-data for reuse
    },
  });
  await agent.login({ identifier: 'alice@mail.com', password: 'hunter2' });
  // await agent.resumeSession(savedSessionData)
  await agent.createAccount({
    email: 'alice@mail.com',
    password: 'hunter2',
    handle: 'alice.example.com',
  });


  const postsResponse = await agent.getPosts();
  if (postsResponse.success) {
    const posts = postsResponse.data.posts;
    // TODO:
  } else {
    throw new Error('Error during uploading image');
  }
}

async function uploadImage(file: File) {
  const agent = new BskyAgent({
    service: 'https://example.com',
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
      // store the session-data for reuse
    },
  });
  await agent.login({ identifier: 'alice@mail.com', password: 'hunter2' });
  // await agent.resumeSession(savedSessionData)
  await agent.createAccount({
    email: 'alice@mail.com',
    password: 'hunter2',
    handle: 'alice.example.com',
  });

  const imgBlob = await uploadData(agent, file);

  let post: AppBskyFeedPost.Record = {
    text: '',
    createdAt: '',
    /*
    embed: {
        media
    }
     */
  };
  agent.post(post);
}

async function uploadData(agent: BskyAgent, file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
  const response = await agent.uploadBlob(buffer);
  if (response.success) {
    return response.data.blob;
  } else {
    throw new Error('Error during uploading image');
  }
}