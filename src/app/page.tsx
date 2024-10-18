import { createApolloClient } from "./lib/apollo-client";
import { GET_TASKS } from "./lib/queries";
import { TaskListResponse } from "./types/task";
import TaskList from "./components/TaskList";

type HomeProps = {
   // Add any props if needed in the future
};

export default async function Home({}: HomeProps) {
   const client = createApolloClient();
   try {
      const { data } = await client.query<TaskListResponse>({
         query: GET_TASKS,
      });

      return (
         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <TaskList tasks={data.taskList} />
         </div>
      );
   } catch (error) {
      console.error("Error fetching tasks:", error);
      return (
         <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <p>Error loading tasks. Please try again later.</p>
         </div>
      );
   }
}
