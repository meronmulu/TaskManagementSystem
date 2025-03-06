import { Button } from "@heroui/react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import ThemeSwitcher from "./TimeSwitcher";


const Navbar = () => {
  return (
    <div>
      <div className="flex justify-end items-center bg-[#F7F8FA] shadow-sm p-2 relative">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <NotificationsActiveIcon className="text-gray-600 text-3xl cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-purple-500 text-white text-xs rounded-full">
              1
            </div>
          </div>
          {/* <ThemeSwitcher/> */}
          <Button color="primary">Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;