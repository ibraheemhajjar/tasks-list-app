"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Task, SortDirection } from "@/app/types";
import TaskList from "./TaskList";
import SortDropdown from "../common/SortDropdown";

type TaskListClientProps = {
   initialTasks: Task[];
};

export default function TaskListClient({ initialTasks }: TaskListClientProps) {
   const [tasks] = useState(initialTasks);
   const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

   const sortTasksBy = useCallback((tasksToSort: Task[], direction: SortDirection) => {
      return [...tasksToSort].sort((a, b) => {
         if (direction === "asc") {
            return a.title.localeCompare(b.title);
         } else {
            return b.title.localeCompare(a.title);
         }
      });
   }, []);

   const sortedTasks = useMemo(() => sortTasksBy(tasks, sortDirection), [tasks, sortDirection, sortTasksBy]);

   const handleSort = useCallback((direction: SortDirection) => {
      setSortDirection(direction);
   }, []);

   return (
      <>
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <SortDropdown onSort={handleSort} currentDirection={sortDirection} />
         </div>
         <TaskList tasks={sortedTasks} />
      </>
   );
}
