"use client";

import * as React from "react";

import Image from "next/image";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";

export function NavLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Image
              className="w-full h-full object-fit"
              src="/images/logoIcon.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Image
              src="/images/logoType.png"
              alt="Logo"
              width={140}
              height={140}
            />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
