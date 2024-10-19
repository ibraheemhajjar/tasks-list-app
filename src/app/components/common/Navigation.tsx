"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList } from "lucide-react";

const iconClasses = "size-5 stroke-gray-500";

const NAV_ARRAY = [
   {
      href: "/",
      label: "Home",
      icon: <Home className={iconClasses} />,
   },
   {
      href: "/tasks",
      label: "Tasks",
      icon: <ClipboardList className={iconClasses} />,
   },
];

const Navigation = () => {
   const pathname = usePathname();

   return (
      <nav className="mb-10">
         <ul className="flex gap-4">
            {NAV_ARRAY.map((navItem, index) => {
               const isActive = navItem.href === "/" ? pathname === "/" : pathname.startsWith(navItem.href);
               return (
                  <li key={index}>
                     <Link
                        href={navItem.href}
                        className={`flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md transition-colors
                           ${isActive ? "bg-gray-100 border-gray-400" : "hover:bg-gray-50"}`}
                     >
                        {navItem.icon}
                        <p>{navItem.label}</p>
                     </Link>
                  </li>
               );
            })}
         </ul>
      </nav>
   );
};

export default Navigation;
