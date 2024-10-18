import { gql } from "@apollo/client";

export const GET_TASKS = gql`
   query TaskList($filter: FilterFindManyTaskInput) {
      taskList(filter: $filter) {
         _id
         description
         status
      }
   }
`;
