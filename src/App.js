import React from 'react';
import TodosPanel from './TodosPanel';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <TodosPanel />
      </div>
    </ApolloProvider>
  );
}

export default App;
