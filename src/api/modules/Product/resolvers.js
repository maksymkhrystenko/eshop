export default pubsub => ({
  Query: {
    async productsQuery(obj, {limit, offset}, context) {
      let edgesArray = [];
      let products = await context.Product.getProductsPagination(limit, parseInt(offset));
      products.map(product => {
        edgesArray.push({
          cursor: product.id,
          node: {
            id: product.id,
            title: product.title,
            description: product.description,
            shortDescription: product.shortDescription,
            price: product.price,
            createdAt: product.createdAt,
          }
        });
      });
      let endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;
      let values = await Promise.all([context.Product.getTotal(), context.Product.getNextPageFlag(endCursor)]);
      return {
        totalCount: values[0],
        edges: edgesArray,
        pageInfo: {
          endCursor: endCursor,
          hasNextPage: ((values[1] > 0) && ((offset > limit) || (offset == 0)))
        }
      };
    },
    product(obj, {id}, context) {
      return context.Product.getProduct(id);
    },
  },
  Mutation: {
    async addProduct(obj, {input}, context) {
      let product = await context.Product.addProduct(input);
      pubsub.publish('productsUpdated', {mutation: 'CREATED', node: product});
      return await context.Product.getProduct(product.id);
    },
    async deleteProduct(obj, {id}, context) {
      let product = await context.Product.getProduct(id);
      let isDeleted = await context.Product.deleteProduct(id);
      if (isDeleted) {
        pubsub.publish('productsUpdated', {mutation: 'DELETED', node: product});
        return product.id;
      } else {
        return null;
      }
    },
    async editProduct(obj, {input}, context) {
      await context.Product.editProduct(input);
      let product = await context.Product.getProduct(input.id);
      // publish for products list
      pubsub.publish('productsUpdated', {mutation: 'UPDATED', node: product});
      // publish for edit product page
      pubsub.publish('productUpdated', {mutation: 'UPDATED', node: product});
      return product;
    },
  },
  Subscription: {
    productUpdated(value) {
      return value;
    },
    productsUpdated(value) {
      return value;
    },
  }
});
