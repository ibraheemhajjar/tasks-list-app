import Link from "next/link";

const Navigation = () => {
   return (
      <nav className="mb-4">
         <ul className="flex space-x-4">
            <li>
               <Link href="/" className="text-blue-500 hover:underline">
                  Home
               </Link>
            </li>
            <li>
               <Link href="/tasks" className="text-blue-500 hover:underline">
                  Tasks
               </Link>
            </li>
         </ul>
      </nav>
   );
};

export default Navigation;
