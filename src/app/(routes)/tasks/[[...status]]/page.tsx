import { Suspense } from "react";
import { createApolloClient } from "@/app/lib/apollo-client";
import { GET_TASKS } from "@/app/lib/queries";
import { TaskListResponse, FilterFindManyTaskInput } from "@/app/types/task";
import TaskListClient from "@/app/components/TaskListClient";
import Navigation from "@/app/components/Navigation";
import TaskTabs from "@/app/components/TaskTabs";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import ErrorMessage from "@/app/components/ErrorMessage";

const statusMapping: { [key: string]: string } = {
   new: "NEW",
   "offer-accepted": "OFFER_ACCEPTED",
   completed: "COMPLETED",
};

async function fetchTasks(status: string | undefined) {
   const client = createApolloClient();
   const filter: FilterFindManyTaskInput = status ? { status } : {};

   try {
      const { data } = await client.query<TaskListResponse>({
         query: GET_TASKS,
         variables: { filter },
      });
      return data.taskList;
   } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks. Please try again later.");
   }
}

export default async function TasksPage({ params }: { params: { status?: string[] } }) {
   const urlStatus = params.status?.[0] || "all";
   const status = urlStatus !== "all" ? statusMapping[urlStatus] || urlStatus.toUpperCase() : undefined;

   return (
      <div className="container mx-auto p-4">
         <Navigation />
         <TaskTabs activeTab={urlStatus} />
         <Suspense fallback={<LoadingSpinner />}>
            <TaskListContent status={status} />
         </Suspense>
      </div>
   );
}

async function TaskListContent({ status }: { status: string | undefined }) {
   try {
      const tasks = await fetchTasks(status);
      return <TaskListClient initialTasks={tasks} />;
   } catch (error) {
      return <ErrorMessage message={(error as Error).message} />;
   }
}
