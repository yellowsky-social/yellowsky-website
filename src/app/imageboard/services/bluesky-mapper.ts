import { PostView } from '@atproto/api/src/client/types/app/bsky/feed/defs';
import { AppBskyEmbedImages, AppBskyFeedPost } from '@atproto/api';
import { BoardImage, BoardPost } from '@/src/app/imageboard/types/content-types';

export function mapPostViewToBoardPost(currentUserId: string, postView: PostView): BoardPost {
  const boardImages: BoardImage[] = [];
  if (AppBskyEmbedImages.isView(postView.embed)) {
    for (let image of postView.embed.images) {
      boardImages.push({ thumb: image.thumb, full: image.fullsize });
    }
  }
  const last = postView.uri.substring(postView.uri.lastIndexOf('/') + 1, postView.uri.length);
  return {
    uri: postView.uri,
    cid: postView.cid,
    sender: {
      did: postView.author.did,
      handle: postView.author.handle,
      displayName: postView.author.displayName || postView.author.handle,
      avatarUrl: postView.author.avatar,
    },
    when: postView.indexedAt,
    images: boardImages,
    postString: AppBskyFeedPost.isRecord(postView.record) && postView.record.text || '',
    postUrl: 'https://bsky.app/profile/' + postView.author.handle + '/post/' + last,
    likes: postView.likeCount || 0,
    liked: !!postView.viewer?.like,
    comments: [], // TODO: Add
    isOwn: postView.author.did === currentUserId,
  };
}