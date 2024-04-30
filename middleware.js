import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function middleware(request) {
    // const jwt = request.cookies.get('usertoken')
    // const cookieTkn = cookies()
    const jwt = cookies().get('usertoken')?.value
    // console.log(jwt)

    if (jwt === undefined) {
        console.log("no hay galleta")
        return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
        console.log("validating token")
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode(process.env.SECRET_KEY))
        if(!payload) {
            return NextResponse.next()
        }
        console.log('token ok')
        return NextResponse.next()
        // console.log(payload)
    } catch (error) {
        console.error(error)
        return NextResponse.redirect(new URL('/login', request.url))
    }

}

export const config = {
    matcher: ['/dashboard/:path*', '/menu/:path*', '/settings/:path*']
}