const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.json());

const BASE_URL = 'https://chat-us-east-1.stream-io-api.com';

app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`
          type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
          }
          input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
          }
          type RootQuery {
              events: [Event!]!
          }
          type RootMutation {
              createEvent(eventInput: EventInput): Event
          }
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
        rootValue: {
            events: () => {
                return events;
            },
            createEvent: args => {
                const event = {
                    _id: Math.random().toString(),
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: +args.eventInput.price,
                    date: args.eventInput.date
                };
                events.push(event);
                return event;
            }
        },
        graphiql: true
    })
);


const headers = {
    "Content-Type": "application/json",
};

var data = {
    "api_key": "fs6d2mvt5vha",
}

app.get('/token', (req, res, next) => {
    fetch(BASE_URL, { method: 'GET', headers: headers})
    .then(response => console.log(response))
    .then(resp => {
        console.log(resp);

    })
    .catch(err => {
        console.log(err);
    });
    
    res.send('Hello World');
})

app.get('/create', (req, res, next) => {
    res.send('Hello World');
})

app.get('/send', (req, res, next) => {
    res.send('Hello World');
})

app.listen(3000);



