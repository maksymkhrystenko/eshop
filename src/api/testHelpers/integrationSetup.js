import chai from 'chai';
import chaiHttp from 'chai-http';

import { getOperationAST } from 'graphql';
import { createApolloFetch } from 'apollo-fetch';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import WebSocket from 'ws';

chai.use(chaiHttp);
chai.should();

let server;
let apollo;

beforeAll(async () => {
  // server = require('../server').default;
  // console.log(99999999);
  // console.log(process.env.PORT);
  // console.log(server);
  const fetch = createApolloFetch({
    uri: `http://localhost:3004/graphql`
  });
  const cache = new InMemoryCache();
  const link = ApolloLink.split(
    operation => {
      const operationAST = getOperationAST(
        operation.query,
        operation.operationName
      );
      return !!operationAST && operationAST.operation === 'subscription';
    },
    new WebSocketLink({
      uri: `ws://localhost:3004/graphql`,
      webSocketImpl: WebSocket
    }),
    new BatchHttpLink({ fetch })
  );

  apollo = new ApolloClient({
    link: ApolloLink.from([link]),
    cache
  });
  /*  console.log(99999999);
  console.log(apollo); */
});

afterAll(() => {
  if (server) {
    server.close();
  }
});

export const getServer = () => server;
export const getApollo = () => apollo;
