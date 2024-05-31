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
    const dir = path.join(process.cwd(), `./public/posts`);
    list = fs.readdirSync(dir).map((v) => v.split(".")[0]);
  }

  const datas = list
    .map((v) => {
      const file = fs.readFileSync(
        path.join(process.cwd(), `./public/posts/${v}.md`),
        "utf8"
      );

      const data: PostData = matter(file).data as PostData;
      if (data.release) return data;
    })
    .filter((v) => v != null);

  return Response.json({ datas: datas });
}
