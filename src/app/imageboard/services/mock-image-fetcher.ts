import { BskyAgent } from '@atproto/api';
import { BoardPost } from '@/src/app/imageboard/types/content-types';

function handle(event: Event) {
  // @ts-ignore
  let file = (event.target as HTMLInputElement).files[0];

}

function prepareBlueskyReply(from: string, text: string, imageUrl?: string, comments?: BoardPost[]): BoardPost {
  const id = randomUUID();
  return {
    id: id,
    cid: id,
    senderHandle: from,
    when: '2023-06-03T12:40:20.860968',
    comments: comments ? comments : [],
    liked: false,
    likes: 132,
    postString: text,
    postImage: imageUrl ? {
      imageUrl: imageUrl,
      imageWidth: 450,
      imageHeight: 250,
    } : undefined,
  };
}

function prepareBoardItem(imageUrl: string, postString?: string, comments?: BoardPost[]): BoardPost {
  const id = randomUUID();
  return {
    senderHandle: '@ysky.app',
    cid: id,
    id: id,
    when: '2023-06-03T12:18:20.860968',
    postImage: {
      imageUrl: imageUrl,
      imageWidth: 450,
      imageHeight: 250,
    },
    likes: 1203122,
    liked: id.startsWith('2') ? true : false,
    postString: postString ? postString : 'This is my post ' + id,
    comments: comments ? comments : [],
  };
}

function randomUUID(): string {
  return Math.floor(Math.random() * 1000000000) + '';
}

export async function fetchImagePosts(): Promise<BoardPost[]> {
  return [
    prepareBoardItem('https://img.pr0gramm.com/2023/06/03/1084bb65dfacabad.jpg'),
    prepareBoardItem('https://avatars.mds.yandex.net/i?id=33a0b3d0e9ae60ded534d46ba21fad66cb3af64c-4322170-images-thumbs&n=13'),
    prepareBoardItem('https://img.pr0gramm.com/2023/06/03/17606cb78673964a.jpg', 'What do you think?', [prepareBlueskyReply('@tierone', 'I don\'t get it. Please explain it to me'), prepareBlueskyReply('@joerns', 'Hahahaha, this is hilarious. Hahahaha, this is hilarious. Hahahaha, this is hilarious. Hahahaha, this is hilarious. Hahahaha, this is hilarious. Hahahaha, this is hilarious. Hahahaha, this is hilarious. Hahahaha, this is hilarious. ', 'https://img.pr0gramm.com/2023/06/03/1084bb65dfacabad.jpg', [prepareBlueskyReply('@tierone', 'I don\'t get it. Please explain it to me'), prepareBlueskyReply('@joerns', 'Hahahaha, this is hilarious', 'https://img.pr0gramm.com/2023/06/03/1084bb65dfacabad.jpg'), prepareBlueskyReply('@joerns2', 'Hihihihi, this is hilarious'), prepareBlueskyReply('@joerns3', 'Muhahahaaa, this is hilarious')]), prepareBlueskyReply('@joerns2', 'Hihihihi, this is hilarious'), prepareBlueskyReply('@joerns3', 'Muhahahaaa, this is hilarious')]),
    prepareBoardItem('https://img.pr0gramm.com/2023/06/02/3c87e9b72f59f79d.jpg'),
    prepareBoardItem('https://img.pr0gramm.com/2023/06/02/e5d079ff2bb7f0a8.jpg'),
    prepareBoardItem('https://avatars.mds.yandex.net/i?id=3a4c1cdc58399dd072736ef9d2863b18d22130ba-6403119-images-thumbs&n=13'),
    prepareBoardItem('https://avatars.mds.yandex.net/i?id=c17d5aa41d8b66910eefd7a951bccbd0a6546146-8710500-images-thumbs&n=13'),
    prepareBoardItem('https://avatars.mds.yandex.net/i?id=c4f1a518e82189e5f6deebb208d212806262a8a9-8310482-images-thumbs&n=13'),
    prepareBoardItem('https://avatars.mds.yandex.net/i?id=f9a2de01dd33b8390898913adf77f98e58e5772c-8567399-images-thumbs&n=13'),
    prepareBoardItem('https://avatars.mds.yandex.net/i?id=4424d6db2ce8172850320ab76de5be097359128a-9240324-images-thumbs&n=13'),
  ];
}

export async function uploadImage(file: File) {
  console.log('Image has been uploaded');
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