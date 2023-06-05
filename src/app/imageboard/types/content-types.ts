export interface LoadedPostResult {
  cursor?: string;
  posts: BoardPost[];
}

export interface BoardPost {
  id: string;
  cid: string;
  senderHandle: string;
  when: string;
  thumbImage?: string;
  fullImage?: string;
  postString?: string;
  postUrl: string;
  likes: number;
  liked?: boolean;
  comments: BoardPost[];
}
