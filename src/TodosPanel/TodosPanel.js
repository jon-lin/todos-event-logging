import React from 'react';
import styled from '@emotion/styled';
import { useQuery, gql } from '@apollo/client';
import _ from 'lodash';

import TodoItem from './TodoItem'

const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      description
      isDone
    }
  }
`;

const Panel = styled.div({
  padding: 24,
  height: '70%',
  width: 300,
  border: '1px solid black',
  overflowY: 'auto',
});

const TodosList = styled.div({
  '& > :not(:last-child)': {
    marginBottom: 12,
  },
});

const TodosPanel = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const [doneItems, todoItems] = _.partition(data.todos, datum => datum.isDone)

  return (
    <Panel>
      <h1 style={{ marginBottom: 24 }}>Todos</h1>
      <TodosList>
        {
          todoItems.map(datum => (
            <TodoItem key={datum._id} {...datum} />
          ))
        }
        {
          doneItems.map(datum => (
            <TodoItem key={datum._id} {...datum} />
          ))
        }
      </TodosList>
    </Panel>
  )
}

export default TodosPanel
