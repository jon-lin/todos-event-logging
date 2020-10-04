import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      _id
      description
      isDone
    }
  }
`;
