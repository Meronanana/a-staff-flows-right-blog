interface Post {
  data: PostData;
  content: PostContent;
}

interface PostData {
  title: string;
  description: string;
  coverImage: string;
  category: string;
  date: string;
  path: string;
  release: true;
}

type PostContent = Array<string>;
