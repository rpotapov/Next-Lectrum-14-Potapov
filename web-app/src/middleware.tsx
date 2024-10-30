import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

const middleware = () => {
  const response = NextResponse.next();
  const cookieStore = cookies();
  const cookie = cookieStore.get('hasVisited');

  if (!cookie?.value) {
    response.cookies.set("hasVisited", "true");
  }

  return response;
};

export { middleware };
