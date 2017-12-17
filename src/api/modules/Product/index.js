import Product from './models';
import schema from './schema.graphqls';
import createResolversFunc from './resolvers';
import Feature from '../connector';

export default new Feature({
  schema,
  createResolversFunc,
  createContextFunc: () => {
    const product = new Product();
    return {
      Product: product
    };
  }
});
