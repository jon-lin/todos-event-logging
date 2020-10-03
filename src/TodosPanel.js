import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      description
      isDone
    }
  }
`;

const TodosPanel = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {
        data.todos.map(({ description, isDone }) => (
          <p>{description}</p>
        ))
      }
    </div>
  )
}

export default TodosPanel
