"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import React, { Fragment } from "react";
import Image from "next/image";
import { ExpandMore } from "@mui/icons-material";
import Link from "next/link";
import { Loader } from "lucide-react";
import { navItems } from "./nav.list";

export function AppSidebar() {
  const [isLoading, setLoading] = React.useState(true);
  const items = navItems();
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 200);
  }, [])


  return (
    <Sidebar collapsible="icon">
      {isLoading ? <SidebarContent>
        <div className="flex items-center justify-center h-full w-full pt-3 pb-8"><Loader className="animate-spin" /></div>
      </SidebarContent> : (
        <Fragment>
          <SidebarHeader>
            <div className="flex items-center justify-center w-full pt-3 pb-8"><Link href="/"><Image alt="logo" className="grayscale hover:grayscale-0 transition-all duration-200" width={100} height={100} priority src={'/logo.png'}></Image></Link></div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {items.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <Collapsible defaultOpen={true} className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild >
                          <SidebarMenuButton asChild variant="default">
                            {item.subItems.length > 0 ? <span>
                              <item.icon className="mr-2 h-5 w-5" />
                              {item.title}
                              <ExpandMore className={`ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-0 -rotate-90`} />
                            </span> : <Link href={item.url}>
                              <item.icon className="mr-2 h-5 w-5" />
                              {item.title}
                            </Link>}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        {item.subItems.length > 0 && (
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subItems.map((subItem, subIndex) => (
                                <SidebarMenuSubItem key={subIndex}>
                                  <SidebarMenuSubButton asChild>
                                    <Link href={subItem.url}>
                                      <subItem.icon className="mr-2 h-5 w-5" />
                                      {subItem.title}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        )}
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="text-center text-sm text-muted-foreground">© 2024 <Link className="hover:underline font-bold" href="https://pras.me" target="_blank">PRAS</Link></p>
          </SidebarFooter>
        </Fragment>
      )}
    </Sidebar>
  );
}
