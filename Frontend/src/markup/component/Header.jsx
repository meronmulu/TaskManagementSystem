import React from 'react';
import img from '../../assets/Taskfulll.gif';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Header() {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between py-3 px-6 shadow-md bg-white z-50">
      <img className="w-40 h-auto" src={img} alt="Logo" />
      <div className="flex items-center space-x-6">
        <NotificationsActiveIcon className="text-gray-600 cursor-pointer" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
