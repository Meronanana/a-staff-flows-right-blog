import { sql } from "@vercel/postgres";

// Get credit balance
export async function GET() {
  const credit = await sql`SELECT * FROM Credit WHERE user_id = 1`;

  return Response.json({ ...credit.rows[0] }, { status: 200 });
}

export async function POST(request: Request) {
  let body;
  if (request.body) {
    body = await request.body
      .getReader()
      .read()
      .then(({ value }) => {
        if (value) {
          return JSON.parse(Buffer.from(value).toString("utf-8"));
        }
      });
  }

  const credit = await sql`SELECT * FROM Credit WHERE user_id = ${body.userId}`;

  return Response.json({ ...credit.rows[0] }, { status: 200 });
}

// Add 1 credit
export async function PATCH(request: Request) {
  let body;
  if (request.body) {
    body = await request.body
      .getReader()
      .read()
      .then(({ value }) => {
        if (value) {
          return JSON.parse(Buffer.from(value).toString("utf-8"));
        }
      });
  }

  await sql`UPDATE Credit SET balance = (
      SELECT balance FROM Credit WHERE user_id = ${body.userId}
    ) + 1 WHERE user_id = ${body.userId}`;

  return Response.json({}, { status: 200 });
}
