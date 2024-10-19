import React from "react";
import { Task } from "./task.type";

type TaskItemProps = {
   task: Task;
};

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
   return (
      <li className="p-4 bg-white shadow-md rounded-lg mb-4">
         <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
         <p className="text-sm text-gray-600 mb-2">{task.description}</p>
         <div className="flex justify-between items-center text-sm">
            <span
               className={`px-2 py-1 rounded ${
                  task.status === "COMPLETED" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
               }`}
            >
               {task.status}
            </span>
            <span className="text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</span>
         </div>
         <div className="mt-2 text-sm text-gray-500">
            <span className="mr-4">Type: {task.type}</span>
            <span>Likes: {task.number_of_likes}</span>
         </div>
         {task.duration && (
            <div className="mt-2 text-sm text-gray-500">
               Duration: {task.duration.value} {task.duration.unit}
            </div>
         )}
      </li>
   );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
