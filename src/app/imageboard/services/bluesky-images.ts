'use client';
import { BoardImage, BoardPost, LoadedPostResult } from '@/src/app/imageboard/types/content-types';
import { AppBskyEmbedImages, AppBskyFeedPost, AtpSessionData, BskyAgent } from '@atproto/api';
import { BLUESKY_ENDPOINT } from '@/src/app/services/bluesky-account';


export async function fetchTimelineImages(minImages: number, cursor?: string): Promise<LoadedPostResult> {
  const sessionJson = sessionStorage.getItem('_session');
  if (!sessionJson) {
    return Promise.reject('Not logged in');
  }

  const savedSessionData: AtpSessionData = JSON.parse(sessionJson);

  const agent = new BskyAgent({ service: BLUESKY_ENDPOINT });

  const sessionResponse = await agent.resumeSession(savedSessionData);
  const currentUserId = sessionResponse.data.did;

  const newPosts: BoardPost[] = [];
  let currentCursor = cursor;

  while (newPosts.length < minImages) {
    const newPostsResponse = await agent.getTimeline({
      limit: 50,
      cursor: currentCursor,
    });

    if (!newPostsResponse.success) {
      throw new Error('Error during fetching data from bluesky');
    } else {
      const feed = newPostsResponse.data.feed;
      if (!!currentCursor) {
        feed.splice(0, 1);
      }
      currentCursor = newPostsResponse.data.cursor;
      for (let f of feed) {
        const post = f.post;
        if (AppBskyFeedPost.isRecord(post.record) && post.record.embed && !post.author.viewer?.muted) {
          
          if (AppBskyEmbedImages.isView(post.embed)) {
            const boardImages: BoardImage[] = [];
            for (let image of post.embed.images) {
              boardImages.push({ thumb: image.thumb, full: image.fullsize });
            }
            // const cleanedURI = post.uri.replace("at://did:plc:", "at://did:plc:")
            const cleanedURI = post.uri;
            const rest = cleanedURI.substring(0, cleanedURI.lastIndexOf('/') + 1);
            const last = cleanedURI.substring(cleanedURI.lastIndexOf('/') + 1, cleanedURI.length);
            const boardPost: BoardPost = {
              id: post.cid,
              cid: post.cid,
              senderHandle: post.author.handle,
              senderName: post.author.displayName || post.author.handle,
              senderAvatarUrl: post.author.avatar,
              when: post.indexedAt,
              images: boardImages,
              postString: post.record.text || '',
              postUrl: 'https://bsky.app/profile/' + post.author.handle + '/post/' + last,
              likes: post.likeCount || 0,
              liked: !!post.viewer?.like,
              comments: [], // TODO: Add
              isOwn: post.author.did === currentUserId,
            };
            newPosts.push(boardPost);
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
