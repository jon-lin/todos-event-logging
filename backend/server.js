const { MongoClient } = require('mongodb');
const { ApolloServer, gql } = require('apollo-server');

const Todo = require('./Todo')

const typeDefs = gql`
  type Query {
    todos: [Todo]
  }

  type Todo {
    _id: ID!
    description: String
    isDone: Boolean
  }

  type Mutation {
    createTodo: Todo!
    updateTodo(input: UpdateTodoInput!): Todo!
    deleteTodo(input: DeleteTodoInput!): Todo!
  }

  input UpdateTodoInput {
    _id: ID!
    description: String
    isDone: Boolean
  }

  input DeleteTodoInput {
    _id: ID!
  }
`;

const resolvers = {
  Query: {
    todos: (parent, args, context, info) => {
      const { db } = context
      
      return db.collection('todos').find().toArray()
    },
  },
  Mutation: {
    createTodo: async (parent, args, context, info) => {
      const { db } = context
      const todo = await Todo.init({ data: {}, db })
      return todo.create(null, new Date())
    },
    updateTodo: async (parent, args, context, info) => {
      const { input: { _id, description, isDone } } = args
      const { db } = context

      const todo = await Todo.init({ 
        data: { _id, description, isDone },
        db,
      })

      return todo.update(null, new Date())
    },
    deleteTodo: async (parent, { input: { _id } }, context, info) => {
      const { db } = context
      const todo = await Todo.init({ data: { _id }, db })
      return todo.delete()
    },
  }
};

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err

  console.log(`Connected to MongoDB cluster`)

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
      const { username, userId } = JSON.parse(req.headers.user_info)
      
      return {
        db: client.db('todos_app'),
        username, 
        userId,
      }
    },
  });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})
