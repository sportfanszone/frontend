"use client";

import { useMemo } from "react";
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
  Eye,
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

  const navMain = useMemo(() => {
    const userSection = {
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
          url: "/admin/add_user",
          icon: UserPlus,
        },
      ],
    };

    const isViewingUser = /^\/admin\/view_user\/[^/]+$/.test(pathname);
    if (isViewingUser) {
      userSection.items.push({
        title: "View User",
        url: pathname,
        icon: Eye,
      });
    }

    const items = [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Home,
      },
      userSection,
      {
        title: "League",
        url: "#",
        icon: Trophy,
        items: [
          {
            title: "All Leagues",
            url: "/admin/all_leagues",
            icon: Trophy,
          },
          {
            title: "Add League",
            url: "/admin/add_league",
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
            url: "/admin/all_clubs",
            icon: BookOpen,
          },
          {
            title: "Add Club",
            url: "/admin/add_club",
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
    ];

    return items;
  }, [pathname]);

  const others = [
    {
      name: "Hero Images",
      url: "/admin/hero_slider",
      icon: Frame,
    },
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
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} pathname={pathname} />
        <NavProjects items={others} pathname={pathname} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
