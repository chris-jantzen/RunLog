const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./models/User');
const { typeDefs, resolvers } = require('./gql/Schema');

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error(err.message));

const context = ({ req }) => {
  token = req.headers.authorization || '';
  const splitToken = token.split(' ')[1];
  try {
    jwt.verify(splitToken, process.env.SECRETKEY);
  } catch (error) {
    throw new AuthenticationError('Auth Token is invalid, please log in');
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.applyMiddleware({ app });

app.post('/get-token', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  if (user) {
    const match = password === user[0].password;
    // TODO: Setup a hash for the password
    // const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      const token = jwt.sign(
        { email: user.email, id: user.id },
        process.env.SECRETKEY
      );
      res.send({
        success: true,
        token: `Bearer ${token}`
      });
    } else {
      res.status(401).send({
        success: false,
        message: 'Incorrect Credentials'
      });
    }
  } else {
    res.status(404).send({
      success: false,
      message: `No account with email: ${email}`
    });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
