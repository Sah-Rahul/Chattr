import { Bell, ChevronDown, Menu, Activity } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface TopbarProps {
  onMobileMenuOpen: () => void;
  onToggleSidebar: () => void;
}

const Topbar = ({ onMobileMenuOpen, onToggleSidebar }: TopbarProps) => {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-md h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuOpen}
          className="lg:hidden cursor-pointer"
        >
          <Menu className="w-8 h-8 " />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hidden lg:flex cursor-pointer"
        >
          <Menu className="w-12 h-12 " />
        </Button>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-8 h-8 bg-[#f7a582] rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold">MediCare</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-6 h-6 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500">
            3
          </Badge>
        </Button>

        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2">
          <div className="w-8 h-8 bg-[#06332e] rounded-full flex items-center justify-center text-white text-sm font-bold">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
