import React from "react";
import { Task } from "@/app/types";
import { upperSnackCaseToString } from "@/app/utils/textFormatting";

type TaskItemProps = {
   task: Task;
};

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
   const formattedDate = React.useMemo(() => {
      return new Date(task.createdAt).toLocaleDateString();
   }, [task.createdAt]);

   return (
      <li className="relative p-4 bg-white shadow-sm rounded-lg mb-4 border border-gray-300">
         <h3 className="text-lg font-semibold mb-2 capitalize">{task.title}</h3>
         <p
            className={`px-2 py-1 rounded absolute top-4 right-4 text-sm ${
               task.status === "COMPLETED"
                  ? "bg-green-200 text-green-800 border border-green-800"
                  : "bg-orange-200 text-yellow-800 border border-yellow-800"
            }`}
         >
            {upperSnackCaseToString(task.status)}
         </p>
         <div className="flex items-center justify-between">
            <div>
               <p className="text-sm text-gray-600 mb-2">{task.description}</p>
               <div className=" items-center text-sm">
                  Created: <span className="text-gray-500">{formattedDate}</span>
               </div>
               <div className="mt-2 text-sm text-gray-500">
                  Duration:
                  {task?.duration?.value && task?.duration?.unit ? (
                     <span>
                        {task.duration.value} {task.duration.unit}
                     </span>
                  ) : (
                     <span> Not Specified</span>
                  )}
               </div>
            </div>
            <div className="text-right">
               <div className="mt-2 text-sm text-gray-500">
                  <p>Type: {upperSnackCaseToString(task.type)}</p>
                  <p>Likes: {task.number_of_likes}</p>
               </div>
            </div>
         </div>
      </li>
   );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
