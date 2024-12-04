"use client"
import * as React from "react"


import { getSession } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"
// This is sample data.
const data = {
 
  navMain: [
    {
      title: "Passwords",
      url: "#",
      items: [
        {
          title: "All Password",
          url: "#",
          isActive:true
        },
        {
          title: "Password Generator",
          url: "#",
        },
        {
          title: "Password Analyzer",
          url: "#",
        },
      ],
    },
  
  ],
}
interface currentSession {
  name: string;
  email: string;
  id: string;
}

// components
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

const [currentSession, setCurrentSession] = React.useState<currentSession>();
function getUserSession(){
  getSession().then((session)=>{
    if(session?.user){

      setCurrentSession(session?.user as currentSession)
    }
    
   }).catch(err=>{
    console.log(err);
    
   })
}
React.useEffect(()=>{
  getUserSession()
},[])

  return (
    <Sidebar {...props}>
      <SidebarHeader>
       
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        {currentSession?.email && currentSession.name ? <NavUser user={currentSession}/> : null}
        
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
