import CheckValidKey from '@/app/DatabaseComponents/CheckValidKey'; 
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) { 
  const url = new URL(request.url);
  const pathname = url.href; 

  // Assuming your slug is at the end of the path
  const parts = pathname.split('/').filter(Boolean); // removes empty parts

  const slug = parts[parts.length - 1]; // last part as slug

  const res=await CheckValidKey(slug);
  return NextResponse.json(res);
}