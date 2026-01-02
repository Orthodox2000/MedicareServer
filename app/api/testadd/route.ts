import { NextRequest, NextResponse } from "next/server";

/* --------- TYPES --------- */
type HealthPayload = {
  username: string;
  device: string;
  location?: string | null;
  weight?: number | null;
  height?: number | null;
  bp?: string | null;
  sugar?: number | null;
  heartRate?: number | null;
  steps?: number | null;
};

/* --------- HELPERS --------- */
const isNumberOrNull = (v: any) =>
  v === null || v === undefined || typeof v === "number";

const isBPValid = (bp: any) =>
  bp === null ||
  bp === undefined ||
  (typeof bp === "string" && /^\d{2,3}\/\d{2,3}$/.test(bp));

/* --------- POST HANDLER --------- */
export async function POST(req: NextRequest) {
  try {
    const body: HealthPayload = await req.json();

    /* ---- REQUIRED FIELDS ---- */
    if (!body.username || !body.device) {
      return NextResponse.json(
        { error: "username and device are required" },
        { status: 400 }
      );
    }

    /* ---- TYPE VALIDATION ---- */
    if (
      !isNumberOrNull(body.weight) ||
      !isNumberOrNull(body.height) ||
      !isNumberOrNull(body.sugar) ||
      !isNumberOrNull(body.heartRate) ||
      !isNumberOrNull(body.steps) ||
      !isBPValid(body.bp)
    ) {
      return NextResponse.json(
        { error: "Invalid health data format" },
        { status: 422 }
      );
    }

    /* ---- DATA NORMALIZATION ---- */
    const payload = {
      ...body,
      createdAt: new Date(),
    };

    /* ---- TEMP LOG (VERIFY REQUEST ARRIVES) ---- */
    console.log("Health data received:", payload);

    /* ---- TODO: MongoDB insert here ---- */

    return NextResponse.json(
      { success: true, data: payload },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
    return NextResponse.json("not allowed");
}