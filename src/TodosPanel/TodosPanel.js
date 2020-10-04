import React from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation } from '@apollo/client';
import _ from 'lodash';

import TodoItem from './TodoItem';

import { GET_TODOS } from '../api/queries';
import { CREATE_TODO } from '../api/mutations';

const Panel = styled.div({
  padding: 24,
  height: '70%',
  width: 300,
  border: '1px solid black',
  overflowY: 'auto',
  marginRight: 24,
});

const TopBar = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 24,
  alignItems: 'center',
})

const CreateTodoButton = styled.button({
  fontSize: 30,
  padding: '0 8px',
  borderRadius: 2,
  background: 'lightgray',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.5,
  } 
})

const TodosList = styled.div({
  '& > :not(:last-child)': {
    marginBottom: 12,
  },
});

const TodosPanel = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  const [createTodo] = useMutation(
    CREATE_TODO,
    { refetchQueries: [{ query: GET_TODOS }] }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const [doneItems, todoItems] = _.partition(data.todos, datum => datum.isDone);

  return (
    <Panel>
      <TopBar>
        <h1>Todos</h1>
        <CreateTodoButton onClick={createTodo}>
          +
        </CreateTodoButton>
      </TopBar>
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
