"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import {
  Home,
  Users,
  UserPlus,
  Trophy,
  PlusCircle,
  BookOpen,
  Settings2,
  Settings,
  CreditCard,
  Gauge,
  Frame,
  PieChart,
  Map,
} from "lucide-react";

import { NavMain } from "@/app/(admin)/components/SidebarNav";
import { NavProjects } from "@/app/(admin)/components/NavProjects";
import { NavUser } from "@/app/(admin)/components/NavUser";
import { NavLogo } from "@/app/(admin)/components/NavLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/components/ui/sidebar";

import { User } from "@/types";

type SidebarProps = {
  user: User;
};

export function AdminSidebar({ ...props }: SidebarProps) {
  const pathname = usePathname();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
      },
      {
        title: "User",
        url: "#",
        icon: Users,
        items: [
          {
            title: "All Users",
            url: "/admin/all_users",
            icon: Users,
          },
          {
            title: "Add User",
            url: "#",
            icon: UserPlus,
          },
        ],
      },
      {
        title: "League",
        url: "#",
        icon: Trophy,
        items: [
          {
            title: "All Leagues",
            url: "#",
            icon: Trophy,
          },
          {
            title: "Add League",
            url: "#",
            icon: PlusCircle,
          },
        ],
      },
      {
        title: "Club",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "All Clubs",
            url: "#",
            icon: BookOpen,
          },
          {
            title: "Add Club",
            url: "#",
            icon: PlusCircle,
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
            icon: Settings,
          },
          {
            title: "Team",
            url: "#",
            icon: Users,
          },
          {
            title: "Billing",
            url: "#",
            icon: CreditCard,
          },
          {
            title: "Limits",
            url: "#",
            icon: Gauge,
          },
        ],
      },
    ],
    others: [
      {
        name: "Profile",
        url: "#",
        icon: Frame,
      },
      {
        name: "Profile settings",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Activity log",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} pathname={pathname} />
        <NavProjects projects={data.others} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
