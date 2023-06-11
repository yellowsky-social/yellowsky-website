import { BoardPost } from '@/src/app/imageboard/types/content-types';
import { AppBskyFeedDefs, AtpSessionData, BskyAgent } from '@atproto/api';
import { BLUESKY_ENDPOINT } from '@/src/app/services/bluesky-account';
import { ThreadViewPost } from '@atproto/api/src/client/types/app/bsky/feed/defs';
import { mapPostViewToBoardPost } from '@/src/app/imageboard/services/bluesky-mapper';

export async function addComment(postId: string, commentMessage: string): Promise<BoardPost> {
  const sessionJson = sessionStorage.getItem('_session');
  if (!sessionJson) {
    return Promise.reject('Not logged in');
  }

  const savedSessionData: AtpSessionData = JSON.parse(sessionJson);
  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });

  const sessionResponse = await agent.resumeSession(savedSessionData);
  const currentUserId = sessionResponse.data.did;


  /* Create record POST body
  {
  "repo" : "did:plc:5s7z6ngkjck5gbwwyww7u6p7",
  "record" : {
    "createdAt" : "2023-06-10T22:40:15.700Z",
    "reply" : {
      "root" : {
        "uri" : "at://did:plc:5s7z6ngkjck5gbwwyww7u6p7/app.bsky.feed.post/3jxtm6mw7oe2n",
        "cid" : "bafyreihpgij5na4dgefrsqdg6357bdd2abhpsweytndjei7kkcxgv6f6ym"
      },
      "parent" : {
        "uri" : "at://did:plc:5s7z6ngkjck5gbwwyww7u6p7/app.bsky.feed.post/3jxtm6mw7oe2n",
        "cid" : "bafyreihpgij5na4dgefrsqdg6357bdd2abhpsweytndjei7kkcxgv6f6ym"
      }
    },
    "$type" : "app.bsky.feed.post",
    "text" : "test"
  },
  "collection" : "app.bsky.feed.post"
}
   */

  // TODO

  return await fetchPostWithComments(postId);
}

export async function likePost(postUri: string): Promise<BoardPost> {
  const sessionJson = sessionStorage.getItem('_session');
  if (!sessionJson) {
    return Promise.reject('Not logged in');
  }

  const savedSessionData: AtpSessionData = JSON.parse(sessionJson);
  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });

  const sessionResponse = await agent.resumeSession(savedSessionData);
  const currentUserId = sessionResponse.data.did;

  let postResponse = await agent.app.bsky.feed.getPosts({
    uris: [postUri],
  });


  return Promise.reject('Not implemented yet');
}

export async function fetchPostWithComments(postUri: string): Promise<BoardPost> {
  const sessionJson = sessionStorage.getItem('_session');
  if (!sessionJson) {
    return Promise.reject('Not logged in');
  }
  console.log('fetchPostWithComments');
  const savedSessionData: AtpSessionData = JSON.parse(sessionJson);
  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });

  const sessionResponse = await agent.resumeSession(savedSessionData);
  const currentUserId = sessionResponse.data.did;

  let postThreadResponse = await agent.app.bsky.feed.getPostThread({
    uri: postUri,
    depth: 5,
  });

  console.log(postThreadResponse);

  if (postThreadResponse.success && AppBskyFeedDefs.isThreadViewPost(postThreadResponse.data.thread)) {
    return mapThreadView(currentUserId, postThreadResponse.data.thread);
  } else {
    return Promise.reject('Post cannot be loaded');
  }
}

function mapThreadView(currentUserId: string, threadView: ThreadViewPost): BoardPost {
  let post = mapPostViewToBoardPost(currentUserId, threadView.post);
  if (threadView.replies) {
    let comments: BoardPost[] = [];
    for (let reply of threadView.replies) {
      if (AppBskyFeedDefs.isThreadViewPost(reply)) {
        comments.push(mapThreadView(currentUserId, reply));
      }
    }
    post.comments = comments;
  }
  return post;
}

async function fetchLatestFeedImages(): Promise<BoardPost[]> {
  // const agent = new BskyAgent({ service: 'https://example.com' });
  // await agent.resumeSession(savedSessionData);
  return [];
}

async function fetchLatestOwnImages(): Promise<BoardPost[]> {
  // const agent = new BskyAgent({ service: 'https://example.com' });
  // await agent.resumeSession(savedSessionData);

  return [];
}

