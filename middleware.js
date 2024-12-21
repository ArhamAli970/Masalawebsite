// import { cookies } from 'next/headers'
// import next from 'next';
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // console.log("hee")

  // console.log("middle warle rn")
    const path=request.nextUrl.pathname
    console.log(path)
    if(path=="/"){
      return NextResponse.next();
    }
    const isPublic=path=="/login" || path=="/signup"

    const tok=request.cookies.get("token")
    // console.log("erer");
    // console.log(tok)

    // console.log(isPublic)

  //   if (path === '/api/addcart' && request.method === 'POST') {
  //     // If the user is not authenticated, redirect to /login
  //     if (!tok) {
  //         // Create a GET redirect to the login page
  //         return NextResponse.redirect(new URL('/login', request.nextUrl)); // This redirects as a GET request
  //     }
  //     // Optionally, perform any other logic or checks
  // }
  

    // return NextResponse.json({data:"hello"})
    if(isPublic && tok){
        return NextResponse.redirect(new URL("/",request.nextUrl));

        // return NextResponse.redirect(new URL("/",re))
    }

    // console.log(!isPublic,"df");
    // console.log(!tok,"dfdf");

    if(!isPublic && !tok){
      console.log("yesccc");
      return NextResponse.redirect(new URL("http://localhost:3000/login", request.nextUrl)); 
    }
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login','/signup','/']
}