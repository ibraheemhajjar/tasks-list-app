import React from "react";
import { Task } from "../types/task";

type TaskListProps = {
   tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
   return (
      <ul className="space-y-2">
         {tasks.map((task) => (
            <li key={task._id} className="p-2 bg-gray-100 rounded">
               <p className="text-sm">{task.description}</p>
            </li>
         ))}
      </ul>
   );
};

export default TaskList;
