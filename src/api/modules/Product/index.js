import Product from './models';
import schema from './schema.graphql';
import createContextFunc from './resolvers';
import Feature from '../connector';
console.log(99);
export default new Feature({
  schema,
  createContextFunc,
  createResolversFunc: () => {
    const product = new Product();
    return {
      Product: product
    };
  }
});
