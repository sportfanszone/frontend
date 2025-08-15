"use client";

import Link from "next/link";
import { MoreHorizontal, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";

export function NavProjects({
  items,
  pathname,
}: {
  items: {
    name: string;
    url: string;
    icon?: LucideIcon;
  }[];
  pathname: string;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Others</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <Link href={item.url || "#"}>
              <SidebarMenuButton
                className={`hover:bg-acent-1/10 ${
                  item.url === pathname &&
                  "bg-acent-1 text-white hover:bg-acent-1 hover:text-white"
                }`}
              >
                {item.icon && <item.icon />}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
