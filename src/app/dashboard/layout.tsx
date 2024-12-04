import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Layout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
      
              <SidebarTrigger className="-ml-1" />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
           
            

          {children}
          </SidebarInset>
        </SidebarProvider>
      )
}