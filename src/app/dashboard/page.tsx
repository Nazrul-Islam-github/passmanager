// "use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SessionWrapper from "../sessionWrapper";
import { SearchForm } from "@/components/search";
import { LoadPasswordProps } from "@/components/load-password";
import { DialogDemo } from "@/components/modal";
import LoadPassword from "@/components/load-password";
import { getAllPassword } from "@/action/getAllPassword";
// import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";

import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
const Page =async (props: {
  searchParams?: Promise<{
    query?: string;
  
  }>;
}) =>{
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  const password = await getAllPassword(query as string);
  return (
    <SessionWrapper>
      <SidebarProvider>
        <SidebarInset>
          <div className="flex h-16 shrink-0  gap-2 border-b px-4 flex-col mx-[50px]">
            <h1 className="text-[40px] font-bold">All Password</h1>
            <p className="text-gray-700 text-[20px]">
              Safety manage and access your passwords.
            </p>
            {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
{/* <span>{search}</span> */}
            <div className=" flex">
              <SearchForm />

              <DialogDemo />
            </div>
            {!password?.length && (  <Alert variant="destructive" className="w-[400px] mt-2+-">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>No Password Found</AlertTitle>
      <AlertDescription>
      Looks like you haven&apos;t added any passwords yet.
      </AlertDescription>
    </Alert>) }
            {password?.map((props) => {
              return (
                <LoadPassword
                  {...(props as LoadPasswordProps)}
                  key={props.id}
                />
              );
            })}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionWrapper>
  );
}
export default Page