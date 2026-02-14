import fs from "fs";
import matter from "gray-matter";
import path from "path";

export async function POST(request: Request) {
  const body = await request.body
    ?.getReader()
    .read()
    .then(({ value }) =>
      value ? JSON.parse(value.toLocaleString() as string) : {}
    );

  let list: string[] = body.list;
  if (list == null) {
    const dir = path.join(process.cwd(), `./public/assets/posts`);
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    // Get slugs from both new structure (folders) and old structure (files)
    list = entries
      .map((v) => {
        if (v.isDirectory() && v.name !== "images" && v.name !== "template") {
          // New structure: folder with index.md
          return v.name;
        } else if (v.isFile() && v.name.endsWith(".md")) {
          // Old structure: {slug}.md
          return v.name.split(".")[0];
        }
        return "";
      })
      .filter((v) => v !== "");
  }

  console.log(list);

  const datas = list
    .map((v) => {
      // Try new structure first, then fallback to old structure
      const newPath = path.join(process.cwd(), `./public/assets/posts/${v}/index.md`);
      const oldPath = path.join(process.cwd(), `./public/assets/posts/${v}.md`);
      
      let file: string;
      if (fs.existsSync(newPath)) {
        file = fs.readFileSync(newPath, "utf-8");
      } else if (fs.existsSync(oldPath)) {
        file = fs.readFileSync(oldPath, "utf-8");
      } else {
        return null;
      }

      const data: PostData = matter(file).data as PostData;
      if (data.release) return data;
      return null;
    })
    .filter((v) => v != null);

  return Response.json({ datas: datas });
}
