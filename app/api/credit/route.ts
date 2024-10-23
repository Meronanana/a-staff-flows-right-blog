import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const credit = await sql`SELECT * FROM Credit WHERE user_id = 1`;

  return Response.json({ ...credit.rows[0] });
}

export async function POST(request: Request) {}
