export interface LoadedPostResult {
  cursor?: string;
  posts: BoardPost[];
}

export interface BoardPost {
  id: string;
  cid: string;
  senderHandle: string;
  senderName: string;
  senderAvatarUrl?: string;
  when: string;
  images: BoardImage[];
  postString?: string;
  postUrl: string;
  likes: number;
  liked?: boolean;
  comments: BoardPost[];
  isOwn: boolean;
}

export interface BoardImage {
  thumb: string;
  full: string;
}
