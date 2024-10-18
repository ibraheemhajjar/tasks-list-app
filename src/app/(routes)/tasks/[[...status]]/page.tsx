import { createApolloClient } from "@/app/lib/apollo-client";
import { GET_TASKS } from "@/app/lib/queries";
import { TaskListResponse, FilterFindManyTaskInput } from "@/app/types/task";
import TaskList from "@/app/components/TaskList";
import Navigation from "@/app/components/Navigation";
import TaskTabs from "@/app/components/TaskTabs";

type Params = {
   status?: string[];
};

const statusMapping: { [key: string]: string } = {
   new: "NEW",
   "offer-accepted": "OFFER_ACCEPTED",
   completed: "COMPLETED",
};

export default async function TasksPage({ params }: { params: Params }) {
   const urlStatus = params.status?.[0] || "all";
   const status = urlStatus !== "all" ? statusMapping[urlStatus] || urlStatus.toUpperCase() : undefined;
   const client = createApolloClient();

   try {
      const filter: FilterFindManyTaskInput = status ? { status } : {};
      const { data } = await client.query<TaskListResponse>({
         query: GET_TASKS,
         variables: { filter },
      });

      return (
         <div className="container mx-auto p-4">
            <Navigation />
            <TaskTabs activeTab={urlStatus} />
            <h1 className="text-2xl font-bold mb-4">{status ? `${status} Tasks` : "All Tasks"}</h1>
            <TaskList tasks={data.taskList} />
         </div>
      );
   } catch (error) {
      console.error("Error fetching tasks:", error);
      return (
         <div className="container mx-auto p-4">
            <Navigation />
            <TaskTabs activeTab={urlStatus} />
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <p>Error loading tasks. Please try again later.</p>
         </div>
      );
   }
}
