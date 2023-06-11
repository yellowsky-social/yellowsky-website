export interface LoadedPostResult {
  cursor?: string;
  posts: BoardPost[];
}

export interface BoardPost {
  uri: string;
  cid: string;
  sender: BskyUser;
  when: string;
  images: BoardImage[];
  postString?: string;
  postUrl: string;
  likes: number;
  liked?: boolean;
  comments: BoardPost[];
  isOwn: boolean;
}

export interface BskyUser {
  avatarUrl?: string;
  handle: string;
  did: string;
  displayName: string;
  followsCount?: number;
}

export interface BoardImage {
  thumb: string;
  full: string;
}
