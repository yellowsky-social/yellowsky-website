export interface BoardImage {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
}

export interface BoardPost {
  id: string;
  cid: string;
  senderHandle: string;
  when: string;
  postImage?: BoardImage;
  postString?: string;
  postUrl: string;
  likes: number;
  liked?: boolean;
  comments: BoardPost[];
}
