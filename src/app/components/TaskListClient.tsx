"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Task } from "@/app/types/task";
import TaskList from "./TaskList";
import SortDropdown from "./SortDropdown";

type TaskListClientProps = {
   initialTasks: Task[];
};

export default function TaskListClient({ initialTasks }: TaskListClientProps) {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

   const sortTasksBy = useCallback((tasksToSort: Task[], direction: "asc" | "desc") => {
      return [...tasksToSort].sort((a, b) => {
         if (direction === "asc") {
            return a.description.localeCompare(b.description);
         } else {
            return b.description.localeCompare(a.description);
         }
      });
   }, []);

   useEffect(() => {
      // Apply default sorting when component mounts or initialTasks change
      setTasks(sortTasksBy(initialTasks, sortDirection));
   }, [initialTasks, sortDirection, sortTasksBy]);

   const handleSort = (direction: "asc" | "desc") => {
      setSortDirection(direction);
      setTasks(sortTasksBy(tasks, direction));
   };

   return (
      <>
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <SortDropdown onSort={handleSort} currentDirection={sortDirection} />
         </div>
         <TaskList tasks={tasks} />
      </>
   );
}
