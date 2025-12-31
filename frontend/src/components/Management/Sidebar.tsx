import {
  Calendar,
  Activity,
  DollarSign,
  Settings,
  LayoutDashboard,
  Stethoscope,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({
  activeMenu,
  setActiveMenu,
  isSidebarCollapsed,
}: SidebarProps) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/management/dashboard",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      link: "/management/appointments",
    },
    {
      id: "doctors",
      label: "Doctors",
      icon: Stethoscope,
      link: "/management/doctor",
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageCircle,
      link: "/management/chat",
    },
    {
      id: "billing",
      label: "Billing",
      icon: DollarSign,
      link: "/management/billing",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      link: "/management/settings",
    },
  ];

  return (
    <TooltipProvider>
      <aside
        className={`fixed top-0 left-0 h-full bg-[#06332e] text-white z-50 transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f7a582] rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">MediCare</span>
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-160px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Tooltip key={item.id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <NavLink to={item.link} className="w-full">
                    <Button
                      variant="ghost"
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full cursor-pointer ${
                        isSidebarCollapsed
                          ? "justify-center px-2"
                          : "justify-start"
                      } ${
                        activeMenu === item.id
                          ? "bg-[#f7a582] text-white hover:bg-[#e59470]"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {!isSidebarCollapsed && (
                        <span className="ml-3 font-medium">{item.label}</span>
                      )}
                    </Button>
                  </NavLink>
                </TooltipTrigger>

                {isSidebarCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                className={`flex items-center cursor-pointer rounded-lg hover:bg-white/10 transition ${
                  isSidebarCollapsed ? "justify-center p-2" : "gap-3 p-3"
                }`}
              >
                <div className="w-10 h-10 bg-[#f7a582] rounded-full flex items-center justify-center text-white font-bold">
                  AD
                </div>

                {!isSidebarCollapsed && (
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-300">Administrator</p>
                  </div>
                )}
              </div>
            </TooltipTrigger>

            {isSidebarCollapsed && (
              <TooltipContent side="right">
                <p>Admin User</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
