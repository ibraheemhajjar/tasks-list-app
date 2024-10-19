export const GET_TASKS = `
  query TaskList($filter: FilterFindManyTaskInput) {
    taskList(filter: $filter) {
      _id
      description
      status
    }
  }
`;
