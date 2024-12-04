"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";
import SessionWrapper from "@/app/sessionWrapper";
import { getSession } from "next-auth/react";

export default function NavBar() {
  // const router = useRouter();
  const pathname = usePathname()
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
   
    
    
    getSession()
      .then((session) => {
        if(session?.user){
          setIsLogin(true)
        }
        else{
          setIsLogin(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (

    <SessionWrapper>
      {!pathname.includes("dashboard")?    <nav className="flex items-center justify-between flex-wrap bg-white px-9 py-5 shadow">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <span className="font-semibold text-xl tracking-tight">
            PasswordManager
          </span>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a
              href="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-4"
            >
              Home
            </a>
          </div>
          <div>
            <div>
              {isLogin && <><Button onClick={() => signOut()} className="mx-1">Signout</Button> 
              <Button ><Link href="/dashboard">Dashboard</Link></Button>
              </>}

              {!isLogin && <>  <Button variant="link" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Create a account </Link>
              </Button></> }
            
            </div>
          </div>
        </div>

        {/* {JSON.stringify(session, null , 2)} */}
      </nav>: null }
   
    </SessionWrapper>
  );
}
