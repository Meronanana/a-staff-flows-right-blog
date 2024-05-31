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
    list = fs
      .readdirSync(dir, { withFileTypes: true })
      .map((v) => {
        if (v.isFile()) return v.name.split(".")[0];
        else return "";
      })
      .filter((v) => v !== "");
  }

  console.log(list);

  const datas = list
    .map((v) => {
      const file = fs.readFileSync(
        path.join(process.cwd(), `./public/assets/posts/${v}.md`),
        "utf-8"
      );

      const data: PostData = matter(file).data as PostData;
      if (data.release) return data;
    })
    .filter((v) => v != null);

  return Response.json({ datas: datas });
}
