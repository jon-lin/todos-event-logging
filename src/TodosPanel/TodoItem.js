import React, { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable'
import styled from '@emotion/styled';

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

const TodoItem = ({ description, isDone }) => {
  const text = useRef(description)
  const [done, toggleDone] = useState(isDone)

  const handleTextChange = e => {
    clearTimeout(GLOBAL_TIMER_ID)
    const newText = e.target.value

    GLOBAL_TIMER_ID = setTimeout(() => {
      console.log(GLOBAL_TIMER_ID)
      console.log(newText)
    }, 250)

    text.current = newText
  }

  return (
    <Box>
      <CheckboxInput
        checked={done}
        type='checkbox'
        onChange={() => toggleDone(!done)}
      />

      <TextInput 
        isDone={done}
        html={text.current}
        onChange={handleTextChange}
      />
    </Box>
  )
}

export default TodoItem
