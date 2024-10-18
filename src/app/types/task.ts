export type Task = {
   _id: string;
   description: string;
};

export type TaskListResponse = {
   taskList: Task[];
};
