import fs from "fs";
import matter from "gray-matter";
import path from "path";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  let body;
  if (request.body) {
    body = await request.body
      .getReader()
      .read()
      .then(({ value }) => {
        if (value) {
          // console.log("value: ", Buffer.from(value).toString("utf-8"));
          return JSON.parse(Buffer.from(value).toString("utf-8"));
        }
      });
  }

  // read markdown file
  let markdown: string;
  try {
    markdown = fs.readFileSync(
      path.join(process.cwd(), `./public/assets/posts/${body.slug}.md`),
      "utf8"
    );
  } catch (e) {
    console.log(e);
    return Response.json({ message: "File not found" }, { status: 404 });
  }

  const { data, content } = matter(markdown);

  // split with '&new' annotation
  const splitMd: PostContent = content.split("\n&new\n");

  return Response.json({ data: data, content: splitMd }, { status: 200 });
}
