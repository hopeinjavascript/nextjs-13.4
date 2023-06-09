import { callApi } from '@/utils';
import { NextResponse } from 'next/server';

/**
 * There are two other objects which are extensions to node's default Request and Response objects.
 * NextRequest && NextResponse
 * these contains some additional utility function
 * */

type TImage = {
  id: number;
  title: string;
  url: string;
};

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const albumId = searchParams.get('albumId');

  if (!albumId) {
    return NextResponse.json({ error: 'No albumId provided' }, { status: 400 });
  }

  const url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
  const images: TImage[] = await callApi(url);

  return NextResponse.json(images);
}
