import NextAuth from "next-auth";

import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoute,
} from "./routes";
const { auth } = NextAuth(authConfig);

export default auth(async(req)=>{
      // Your custom middleware logic goes here
      const { nextUrl } = req;
      const isLogin = !!req.auth;
    
      const isApiRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoute.includes(nextUrl.pathname);
      const isAuthRotes = authRoutes.includes(nextUrl.pathname);
    
      if(isPublicRoute){
        return
      }
      if (isApiRoutes) {
        return;
      }
      if (isAuthRotes) {
        if (isLogin) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
      }
    
      if(!isLogin){
        return Response.redirect(new URL("/auth/login",nextUrl))
      }
    
      return 


})

export const config = {
    matcher: ["/((?!api|_next).*)"],
  };