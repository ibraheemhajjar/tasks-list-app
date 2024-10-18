export type Task = {
   _id: string;
   description: string;
   status: string;
};

export type TaskListResponse = {
   taskList: Task[];
};

export type FilterFindManyTaskInput = {
   status?: string;
};
