// "use client";

// import { Switch } from "@heroui/react";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import LightModeIcon from "@mui/icons-material/LightMode";
// import DarkModeIcon from "@mui/icons-material/DarkMode";

// const ThemeSwitcher = () => {
//   const [mounted, setMounted] = useState(false);
//   const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className="flex items-center space-x-2">
//       {resolvedTheme === "dark" ? <DarkModeIcon className="text-yellow-500" /> : <LightModeIcon className="text-gray-500" />}
//       <Switch
//         isSelected={resolvedTheme === "dark"}
//         onValueChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
//       />
//     </div>
//   );
// };

// export default ThemeSwitcher;
