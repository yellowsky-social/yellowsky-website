import { BoardPost, LoadedPostResult } from '@/src/app/imageboard/types/content-types';
import { AtpSessionData, BskyAgent } from '@atproto/api';
import * as AppBskyEmbedImages from '@atproto/api/src/client/types/app/bsky/embed/images';
import { ViewRecord } from '@atproto/api/src/client/types/app/bsky/embed/record';
import { BLUESKY_ENDPOINT } from '@/src/app/services/bluesky-account';


async function fetchTimelineImages(minImages: number, cursor: string | undefined): Promise<LoadedPostResult> {
  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });
  /*
  await agent.resumeSession({
    handle: '',
    did: '',
    accessJwt: '',
    refreshJwt: '',
  });
   */

  // TODO: Load session from storage
  const savedSessionData: AtpSessionData = {
    handle: '',
    did: '',
    accessJwt: '',
    refreshJwt: '',
  };
  await agent.resumeSession(savedSessionData);

  const newPosts: BoardPost[] = [];
  let currentCursor = cursor;

  while (newPosts.length < minImages) {
    const newPostsResponse = await agent.getTimeline({
      limit: 25,
      cursor: cursor,
    });

    console.log('Bluesky response:');
    console.log(newPostsResponse);

    if (!newPostsResponse.success) {
      throw new Error('Error during fetching data from bluesky');
    } else {
      currentCursor = newPostsResponse.data.cursor;
      for (let f of newPostsResponse.data.feed) {
        console.log('FeedViewPost: ');
        console.log(f);
        if (f.post.embed && f.post.embed.$type == 'app.bsky.embed.images') {
          for (let image of (f.post.embed! as AppBskyEmbedImages.View).images) {
            const boardPost: BoardPost = {
              id: f.post.cid,
              cid: f.post.cid,
              senderHandle: f.post.author.handle,
              when: f.post.indexedAt,
              thumbImage: image.thumb,
              fullImage: image.fullsize,
              postString: (f.post.embed.record as ViewRecord).value.toString() || '',
              postUrl: f.post.uri,
              likes: f.post.likeCount || 0,
              liked: !!f.post.viewer?.like,
              comments: [], // TODO: Add
            };
          }
        }
      }
    }
  }

  return {
    cursor: currentCursor,
    posts: newPosts,
  };
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

