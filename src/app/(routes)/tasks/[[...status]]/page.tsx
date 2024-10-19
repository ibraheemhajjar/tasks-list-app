import { Suspense } from "react";
import { fetchTasks } from "@/app/lib/fetchTasks";
import { FilterFindManyTaskInput } from "@/app/types/task";
import TaskListClient from "@/app/components/Task/TaskListClient";
import Navigation from "@/app/components/common/Navigation";
import TaskTabs from "@/app/components/Task/TaskTabs";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import ErrorMessage from "@/app/components/common/ErrorMessage";

const statusMapping: { [key: string]: string } = {
   new: "NEW",
   "offer-accepted": "OFFER_ACCEPTED",
   completed: "COMPLETED",
};

export default function TasksPage({ params }: { params: { status?: string[] } }) {
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
      const filter: FilterFindManyTaskInput = status ? { status } : {};
      const tasks = await fetchTasks(filter);
      return <TaskListClient initialTasks={tasks} />;
   } catch (error) {
      return <ErrorMessage message={(error as Error).message} />;
   }
}
