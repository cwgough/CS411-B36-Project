const { graphql, buildSchema } = require('graphql');

// Builds a schema using the GraphQL schema language
const testSchema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root of our graph gives us access to resolvers for each type and field
const resolversRoot = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run the GraphQL query '{ hello }' and print out the response
graphql({
  schema: testSchema,
  source: '{ hello }',
  rootValue: resolversRoot
}).then((response) => {
  console.log(JSON.stringify(response.data));
});