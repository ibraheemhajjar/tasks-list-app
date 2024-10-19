export type Task = {
   _id: string;
   title: string;
   description: string;
   status: string;
   createdAt: string;
   duration?: {
      unit: string;
      value: number;
   };
   is_active: boolean;
   number_of_likes: number;
   type: string;
};
