export const GET_TASKS = `
  query TaskList($filter: FilterFindManyTaskInput) {
    taskList(filter: $filter) {
      _id
      title
      description
      status
      createdAt
      duration {
        unit
        value
      }
      is_active
      number_of_likes
      type
    }
  }
`;
