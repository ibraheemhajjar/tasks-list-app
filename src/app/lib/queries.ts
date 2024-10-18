import { gql } from "@apollo/client";

export const GET_TASKS = gql`
   query TaskList {
      taskList {
         _id
         description
      }
   }
`;
