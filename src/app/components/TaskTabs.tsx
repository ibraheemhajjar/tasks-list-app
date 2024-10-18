import Link from "next/link";

type TaskTabsProps = {
   activeTab: string;
};

const TaskTabs: React.FC<TaskTabsProps> = ({ activeTab }) => {
   const tabs = [
      { name: "All", href: "/tasks", status: "all" },
      { name: "New", href: "/tasks/new", status: "new" },
      { name: "Offer Accepted", href: "/tasks/offer-accepted", status: "offer-accepted" },
      { name: "Completed", href: "/tasks/completed", status: "completed" },
   ];

   return (
      <div className="mb-4">
         <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
               {tabs.map((tab) => (
                  <Link
                     key={tab.name}
                     href={tab.href}
                     className={`
                w-1/4 py-2 px-1 text-center border-b-2 font-medium text-sm
                ${
                   activeTab === tab.status
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
                  >
                     {tab.name}
                  </Link>
               ))}
            </nav>
         </div>
      </div>
   );
};

export default TaskTabs;
