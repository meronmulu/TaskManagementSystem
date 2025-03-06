import { Image } from "@heroui/react";
import Navbar from "../component/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div className="flex h-screen">
        {/* LEFT PART */}
        <div className="w-[16%]  md:w-[8%] lg:w-[16%] py-2 px-4  border-r border-gray-200  bg-white  ">
          <Image src="/Taskfulll.gif"  alt=""   className="py-2 px-4"/>

        </div>


        {/* RIGHT PART */}
         <div className="w-[84%]  md:w-[92%] lg:w-[84%]   border-r border-gray-200  bg-[#F7F8FA]"> 
            <Navbar/>
              <div className="">
                {children}
              </div>
         </div>
       {/* {children} */}
      </div>
  
  );
}