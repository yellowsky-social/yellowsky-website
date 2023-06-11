'use client';
import { BoardPost, LoadedPostResult } from '@/src/app/imageboard/types/content-types';
import { AppBskyEmbedImages, AppBskyFeedPost, AtpSessionData, BskyAgent } from '@atproto/api';
import { BLUESKY_ENDPOINT } from '@/src/app/services/bluesky-account';
import * as AppBskyFeedDefs from '@atproto/api/src/client/types/app/bsky/feed/defs';
import { Headers } from '@atproto/xrpc';
import { OutputSchema } from '@atproto/api/src/client/types/app/bsky/feed/getFeed';
import { mapPostViewToBoardPost } from '@/src/app/imageboard/services/bluesky-mapper';

const FEED_ID = 'at://did:plc:vpkhqolt662uhesyj6nxm7ys/app.bsky.feed.generator/allpics';

export enum BoardType {
  TIMELINE, FEED
}

export async function fetchImages(boardType: BoardType, minImages: number, cursor?: string): Promise<LoadedPostResult> {
  console.log('Fetch images of board ' + boardType);
  const sessionJson = sessionStorage.getItem('_session');
  if (!sessionJson) {
    return Promise.reject('Not logged in');
  }

  const savedSessionData: AtpSessionData = JSON.parse(sessionJson);
  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });

  const sessionResponse = await agent.resumeSession(savedSessionData);
  const currentUserId = sessionResponse.data.did;

  let newPosts: BoardPost[] = [];
  let currentCursor = cursor;

  while (newPosts.length < minImages) {

    let newPostsResponse: {
      success: boolean
      headers: Headers
      data: OutputSchema
    };

    if (boardType === BoardType.FEED) {
      newPostsResponse = await agent.app.bsky.feed.getFeed({
        feed: FEED_ID,
        cursor: currentCursor,
        limit: minImages > 30 ? 30 : minImages,
      });
    } else if (boardType === BoardType.TIMELINE) {
      newPostsResponse = await agent.getTimeline({
        cursor: currentCursor,
        limit: minImages > 30 ? 30 : minImages,
      });
    } else {
      return Promise.reject('Invalid board');
    }

    if (!newPostsResponse.success) {
      throw new Error('Error during fetching data from bluesky');
    } else {
      let feed = newPostsResponse.data.feed;
      currentCursor = newPostsResponse.data.cursor;
      newPosts = [...newPosts, ...aggregateFeed(feed, currentUserId)];
    }
  }

  return {
    cursor: currentCursor,
    posts: newPosts,
  };
}

export async function fetchLatestFeedImages(): Promise<BoardPost[]> {
  // const agent = new BskyAgent({ service: 'https://example.com' });
  // await agent.resumeSession(savedSessionData);
  return [];
}

export async function fetchLatestOwnImages(): Promise<BoardPost[]> {
  // const agent = new BskyAgent({ service: 'https://example.com' });
  // await agent.resumeSession(savedSessionData);

  return [];
}

export async function likeImage() {

}

function aggregateFeed(feed: AppBskyFeedDefs.FeedViewPost[], currentUserId: string) {
  let newPosts: BoardPost[] = [];
  for (let f of feed) {
    const post = f.post;
    if (AppBskyFeedPost.isRecord(post.record) && post.record.embed && !post.author.viewer?.muted) {

      if (AppBskyEmbedImages.isView(post.embed)) {
        newPosts.push(mapPostViewToBoardPost(currentUserId, post));
      }
    }
  }
  return newPosts;
}
