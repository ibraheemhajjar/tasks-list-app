import { TaskListResponse, FilterFindManyTaskInput } from "@/app/types/task";
import { GET_TASKS } from "./graphql/queries";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTasks(filter: FilterFindManyTaskInput = {}) {
   if (!API_URL) {
      throw new Error("API URL is not defined");
   }

   const response = await fetch(API_URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         query: GET_TASKS,
         variables: { filter },
      }),
      next: { revalidate: 60 },
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const { data, errors } = await response.json();

   if (errors) {
      throw new Error(errors[0].message);
   }

   return data.taskList as TaskListResponse["taskList"];
}
