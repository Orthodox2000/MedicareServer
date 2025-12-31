// app/api/pp/add/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest ) {
  const url = new URL(req.url);

  // Extract query parameters
  const height = url.searchParams.get('height');
  const weight = url.searchParams.get('weight');
  const bp = url.searchParams.get('bp');
  const walkedDistance = url.searchParams.get('walkedDistance');
  const uploadTime = url.searchParams.get('uploadTime');
  const deviceInfo = url.searchParams.get('deviceInfo');

  // You can process these parameters as needed
  const data = {
    height,
    weight,
    bp,
    walkedDistance,
    uploadTime,
    deviceInfo,
  };

  // Respond with the received query parameters
  const response=NextResponse.json({ message: 'Parameters received', data });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response
}