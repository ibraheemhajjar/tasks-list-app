"use client";

import { useEffect, useState, useCallback } from "react";
import { createApolloClient } from "@/app/lib/apollo-client";
import { GET_TASKS } from "@/app/lib/queries";
import { TaskListResponse, FilterFindManyTaskInput, Task } from "@/app/types/task";
import TaskList from "@/app/components/TaskList";
import Navigation from "@/app/components/Navigation";
import TaskTabs from "@/app/components/TaskTabs";
import SortDropdown from "@/app/components/SortDropdown";

type Params = {
   status?: string[];
};

const statusMapping: { [key: string]: string } = {
   new: "NEW",
   "offer-accepted": "OFFER_ACCEPTED",
   completed: "COMPLETED",
};

export default function TasksPage({ params }: { params: Params }) {
   const [tasks, setTasks] = useState<Task[]>([]);
   const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
   const urlStatus = params.status?.[0] || "all";
   const status = urlStatus !== "all" ? statusMapping[urlStatus] || urlStatus.toUpperCase() : undefined;

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
      const fetchTasks = async () => {
         const client = createApolloClient();
         try {
            setLoading(true);
            const filter: FilterFindManyTaskInput = status ? { status } : {};
            const { data } = await client.query<TaskListResponse>({
               query: GET_TASKS,
               variables: { filter },
            });
            setTasks(data.taskList);
            setError(null);
         } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Error loading tasks. Please try again later.");
         } finally {
            setLoading(false);
         }
      };

      fetchTasks();
   }, [status]);

   useEffect(() => {
      setSortedTasks(sortTasksBy(tasks, sortDirection));
   }, [tasks, sortDirection, sortTasksBy]);

   const handleSort = (direction: "asc" | "desc") => {
      setSortDirection(direction);
   };

   if (loading) return <div>Loading...</div>;
   if (error) return <div>{error}</div>;

   return (
      <div className="container mx-auto p-4">
         <Navigation />
         <TaskTabs activeTab={urlStatus} />
         <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{status ? `${status} Tasks` : "All Tasks"}</h1>
            <SortDropdown onSort={handleSort} currentDirection={sortDirection} />
         </div>
         <TaskList tasks={sortedTasks} />
      </div>
   );
}
