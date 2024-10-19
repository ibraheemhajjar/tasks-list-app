import React from "react";
import { Task } from "./task.type";
import TaskItem from "./TaskItem";

type TaskListProps = {
   tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = React.memo(({ tasks }) => {
   return (
      <ul className="space-y-4">
         {tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
         ))}
      </ul>
   );
});

TaskList.displayName = "TaskList";

export default TaskList;
