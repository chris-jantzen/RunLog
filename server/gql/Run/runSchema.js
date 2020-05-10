const { mutation, mutationResolver } = require('./runMutations');
const { query, queryResolver } = require('./runQueries');

const typeDef = `
  type Run {
    id: ID!
    distance: Float!
    time: String!
    location: String
    timeOfDay: TimeOfDay
    date: String
    comment: String
    shoeId: String
    userId: String!
    user: User
    shoe: Shoe
  }

  enum TimeOfDay {
    morning
    afternoon
    evening
    night
  }
`;

module.exports = {
  typeDef,
  mutation,
  query,
  queryResolver,
  mutationResolver
};
