"use client";

import * as React from "react";
import {
  Coins,
  GalleryVerticalEnd,
  History,
  House,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/global/useUser";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [nav, setNav] = React.useState<any>([]);
  const { user } = useUser();

  const data = {
    teams: [
      {
        name: "Treasury System",
        logo: GalleryVerticalEnd,
        plan: "Treasurer's Office",
      },
    ],
  };

  const admin = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Payables",
      url: "/payables",
      icon: Coins,
    },
    {
      title: "Offices",
      url: "/offices",
      icon: House,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Audit Logs",
      url: "/audit-logs",
      icon: History,
    },
  ];

  const encoder = [
    {
      title: "Payables",
      url: "/payables",
      icon: Coins,
    },
    {
      title: "Offices",
      url: "/offices",
      icon: House,
    },
  ];

  React.useEffect(() => {
    user?.classification == "Admin" && setNav(admin);
    user?.classification == "Encoder" && setNav(encoder);
  }, [user?.id]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={nav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
