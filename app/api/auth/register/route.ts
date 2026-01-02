import clientPromise from "@/app/lib/mongo";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { uid, username, email, mobile } = body;

  if (!uid || !username || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  // Check username uniqueness
  const existing = await db.collection("users").findOne({ username });
  if (existing) {
    return NextResponse.json({ error: "Username already taken" }, { status: 409 });
  }

  await db.collection("users").insertOne({
    uid,
    username,
    email,
    mobile,
    createdAt: new Date()
  });

  return NextResponse.json({ success: true });
}
