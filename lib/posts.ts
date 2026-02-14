import fs from "fs";
import matter from "gray-matter";
import path from "path";

export async function getPost(slug: string): Promise<{ data: PostData; content: PostContent } | null> {
  try {
    const newPath = path.join(process.cwd(), `public/assets/posts/${slug}/index.md`);
    const oldPath = path.join(process.cwd(), `public/assets/posts/${slug}.md`);
    
    let markdown: string;
    if (fs.existsSync(newPath)) {
      markdown = fs.readFileSync(newPath, "utf8");
    } else if (fs.existsSync(oldPath)) {
      markdown = fs.readFileSync(oldPath, "utf8");
    } else {
      return null;
    }

    const { data, content } = matter(markdown);
    
    // split with '&new' annotation
    const splitMd: PostContent = content.split(/\r?\n\s*&new\s*\r?\n/);

    return { data: data as PostData, content: splitMd };
  } catch (e) {
    console.error("Error reading post:", e);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const dir = path.join(process.cwd(), `./public/assets/posts`);
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  return entries
    .map((v) => {
      if (v.isDirectory() && v.name !== "images" && v.name !== "template") {
        return v.name;
      } else if (v.isFile() && v.name.endsWith(".md")) {
        return v.name.split(".")[0];
      }
      return "";
    })
    .filter((v) => v !== "");
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = await getAllPostSlugs();
  const posts: PostData[] = [];

  for (const slug of slugs) {
    const post = await getPost(slug);
    if (post && post.data.release) {
      posts.push(post.data);
    }
  }

  return posts;
}
