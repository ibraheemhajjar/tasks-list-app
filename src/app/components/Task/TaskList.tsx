import React from "react";
import { Task } from "@/app/types";
import TaskItem from "./TaskItem";

type TaskListProps = {
   tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = React.memo(({ tasks }) => {
   return (
      <ul className="w-full">
         {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
         ))}
      </ul>
   );
});

TaskList.displayName = "TaskList";

export default TaskList;
