import React from 'react';
import styled from '@emotion/styled';
import TodosPanel from './TodosPanel/TodosPanel';
import './index.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const TodosPage = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 24,
  height: '100vh',
})

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <TodosPage>
        <TodosPanel />
      </TodosPage>
    </ApolloProvider>
  );
}

export default App;
