export default pubsub => ({
  Query: {
    async productsQuery(obj, {limit, offset}, context) {
      let edgesArray = [];
      let products = await context.Product.getProductsPagination(limit, parseInt(offset));
      products.map(product => {
        edgesArray.push({
          cursor: product.uid,
          node: {
            uid: product.uid,
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
    product(obj, {uid}, context) {
      return context.Product.getProduct(uid);
    },
  },
  Mutation: {
    async addProduct(obj, {input}, context) {
      let product = await context.Product.addProduct(input);
      pubsub.publish('productsUpdated', {mutation: 'CREATED', node: product});
      return await context.Product.getProduct(product.uid);
    },
    async deleteProduct(obj, {uid}, context) {
      let product = await context.Product.getProduct(uid);
      let isDeleted = await context.Product.deleteProduct(uid);
      if (isDeleted) {
        pubsub.publish('productsUpdated', {mutation: 'DELETED', node: product});
        return product.uid;
      } else {
        return null;
      }
    },
    async editProduct(obj, {input}, context) {
      await context.Product.editProduct(input);
      let product = await context.Product.getProduct(input.uid);
      // publish for products list
      pubsub.publish('productsUpdated', {mutation: 'UPDATED', node: product});
      // publish for edit product page
      pubsub.publish('productUpdated', {mutation: 'UPDATED',node: product});
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
