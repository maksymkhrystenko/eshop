import Product from './models';
import schema from './schema.graphql';
import createResolversFunc1 from './resolvers';
import Feature from '../connector';

export default new Feature({
  schema,
  createResolversFunc: createResolversFunc1,
  createContextFunc: () => {
    return {
      Product: new Product()
    };
  }
});
