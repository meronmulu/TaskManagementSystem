import React from 'react';
import img from '../../assets/Taskful.gif';

function Login() {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-16  rounded-lg grid grid-cols-2 gap-8 w-[900px]">
        
        <div className="flex justify-center items-center">
          <img className="w-[500px]" src={img} alt="Login Illustration" />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">LOGIN</h2>
          <form className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
           
            <div className="flex flex-col">
              <label className="text-gray-600 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Login Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition mt-4">
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
