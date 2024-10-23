import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const credit = await sql`SELECT * FROM Credit WHERE user_id = 1`;

  return Response.json({ ...credit.rows[0] });
}

export async function POST(request: Request) {}

export async function PATCH(request: Request) {
  await sql`UPDATE Credit SET balance = (
      SELECT balance FROM Credit WHERE user_id = 1
    ) + 1 WHERE user_id = 1`;

  return Response.json({}, { status: 200 });
}