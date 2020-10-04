import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import ContentEditable from 'react-contenteditable'
import styled from '@emotion/styled';

import { GET_TODOS } from '../api/queries';
import { UPDATE_TODO } from '../api/mutations';

let GLOBAL_TIMER_ID = null;

const Box = styled.div({
  display: 'flex',
});

const CheckboxInput = styled.input({
  marginRight: 12,
  position: 'relative',
  top: 2,
});

const TextInput = styled(ContentEditable)({
  flex: '1 1 auto',
}, ({ isDone }) => ({
  textDecoration: isDone ? 'line-through' : 'none',
}));

const TodoItem = ({ _id, description, isDone }) => {
  const text = useRef(description)
  const [done, toggleDone] = useState(isDone)

  const [updateTodo] = useMutation(UPDATE_TODO, {
    variables: { 
      input: { 
        _id,
        description: text.current,
        isDone: done,
      } 
    },
    refetchQueries: [{ query: GET_TODOS }],
    onError: alert,
  })

  const handleChange = e => {
    if (e.type === 'input') {
      clearTimeout(GLOBAL_TIMER_ID)
      text.current = e.target.value
    } else {
      toggleDone(!done)
    }
    
    GLOBAL_TIMER_ID = setTimeout(updateTodo, 250)
  }

  return (
    <Box>
      <CheckboxInput
        checked={done}
        type='checkbox'
        onChange={handleChange}
      />

      <TextInput 
        isDone={done}
        html={text.current}
        onChange={handleChange}
      />
    </Box>
  )
}

export default TodoItem
