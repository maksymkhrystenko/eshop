import { expect } from 'chai';
import { step } from 'mocha-steps';
import _ from 'lodash';

import Renderer from '../../../../client/testHelpers/Renderer';
import PRODUCTS_SUBSCRIPTION from '../graphql/ProductsSubscription.graphql';
import PRODUCT_SUBSCRIPTION from '../graphql/ProductSubscription.graphql';
import COMMENT_SUBSCRIPTION from '../graphql/CommentSubscription.graphql';

const createNode = id => ({
  id: `${id}`,
  title: `Product title ${id}`,
  description: `Product description ${id}`,
  comments: [
    { id: id * 1000 + 1, content: 'Product comment 1', __typename: 'Comment' },
    { id: id * 1000 + 2, content: 'Product comment 2', __typename: 'Comment' }
  ],
  __typename: 'Product'
});

const mutations = {
  editProduct: true,
  addComment: true,
  editComment: true
};

const mocks = {
  Query: () => ({
    products(ignored, { offset }) {
      const totalCount = 4;
      const edges = [];
      for (let i = +offset + 1; i <= +offset + 2; i++) {
        edges.push({
          cursor: i,
          node: createNode(i),
          __typename: 'ProductEdges'
        });
      }
      return {
        totalCount,
        edges,
        pageInfo: {
          endCursor: edges[edges.length - 1].cursor,
          hasNextPage: true,
          __typename: 'ProductPageInfo'
        },
        __typename: 'Products'
      };
    },
    product(obj, { id }) {
      return createNode(id);
    }
  }),
  Mutation: () => ({
    deleteProduct: (obj, { id }) => createNode(id),
    deleteComment: (obj, { input }) => input,
    ...mutations
  })
};

describe('Products and comments example UI works', () => {
  const renderer = new Renderer(mocks, {});
  let app;
  let description;

  beforeEach(() => {
    // Reset spy mutations on each step
    Object.keys(mutations).forEach(key => delete mutations[key]);
    if (app) {
      app.update();
      description = app.find('#description').last();
    }
  });

  step('Products page renders without data', () => {
    app = renderer.mount();
    description = app.find('#description').last();
    renderer.history.push('/products');

    description.text().should.equal('Loading...');
  });

  step('Products page renders with data', () => {
    expect(description.text()).to.include('Product title 1');
    expect(description.text()).to.include('Product title 2');
    expect(description.text()).to.include('2 / 4');
  });

  step('Clicking load more works', () => {
    const loadMoreButton = description.find('#load-more').last();
    loadMoreButton.simulate('click');
  });

  step('Clicking load more loads more products', () => {
    expect(description.text()).to.include('Product title 3');
    expect(description.text()).to.include('Product title 4');
    expect(description.text()).to.include('4 / 4');
  });

  step('Check subscribed to product list updates', () => {
    expect(renderer.getSubscriptions(PRODUCTS_SUBSCRIPTION)).has.lengthOf(1);
  });

  step('Updates product list on product delete from subscription', () => {
    const subscription = renderer.getSubscriptions(PRODUCTS_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        productsUpdated: {
          mutation: 'DELETED',
          node: createNode(2),
          __typename: 'UpdateProductPayload'
        }
      }
    });

    expect(content.text()).to.not.include('Product title 2');
    expect(content.text()).to.include('3 / 3');
  });

  step('Updates product list on product create from subscription', () => {
    const subscription = renderer.getSubscriptions(PRODUCTS_SUBSCRIPTION)[0];
    subscription.next(
      _.cloneDeep({
        data: {
          productsUpdated: {
            mutation: 'CREATED',
            node: createNode(2),
            __typename: 'UpdateProductPayload'
          }
        }
      })
    );

    expect(content.text()).to.include('Product title 2');
    expect(content.text()).to.include('4 / 4');
  });

  step('Clicking delete optimistically removes product', () => {
    mutations.deleteProduct = (obj, { id }) => {
      return createNode(id);
    };

    const deleteButtons = content.find('.delete-button');
    expect(deleteButtons).has.lengthOf(12);
    deleteButtons.last().simulate('click');

    expect(content.text()).to.not.include('Product title 4');
    expect(content.text()).to.include('3 / 3');
  });

  step('Clicking delete removes the product', () => {
    expect(content.text()).to.include('Product title 3');
    expect(content.text()).to.not.include('Product title 4');
    expect(content.text()).to.include('3 / 3');
  });

  step('Clicking on product works', () => {
    const productLinks = content.find('.product-link');
    productLinks.last().simulate('click', { button: 0 });
  });

  step('Clicking on product opens product form', () => {
    const productForm = content.find('form[name="product"]');

    expect(content.text()).to.include('Edit Product');
    expect(
      productForm
        .find('[name="title"]')
        .last()
        .instance().value
    ).to.equal('Product title 3');
    expect(
      productForm
        .find('[name="content"]')
        .last()
        .instance().value
    ).to.equal('Product content 3');
  });

  step('Check subscribed to product updates', () => {
    expect(renderer.getSubscriptions(PRODUCT_SUBSCRIPTION)).has.lengthOf(1);
  });

  step('Updates product form on product updated from subscription', () => {
    const subscription = renderer.getSubscriptions(PRODUCT_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        productUpdated: {
          id: '3',
          title: 'Product title 203',
          content: 'Product content 204',
          __typename: 'Product'
        }
      }
    });
    const productForm = content.find('form[name="product"]');

    expect(
      productForm
        .find('[name="title"]')
        .last()
        .instance().value
    ).to.equal('Product title 203');
    expect(
      productForm
        .find('[name="content"]')
        .last()
        .instance().value
    ).to.equal('Product content 204');
  });

  step('Product editing form works', done => {
    mutations.editProduct = (obj, { input }) => {
      expect(input.id).to.equal(3);
      expect(input.title).to.equal('Product title 33');
      expect(input.content).to.equal('Product content 33');
      done();
      return input;
    };

    const productForm = app.find('form[name="product"]').last();
    productForm
      .find('[name="title"]')
      .last()
      .simulate('change', { target: { value: 'Product title 33' } });
    productForm
      .find('[name="content"]')
      .last()
      .simulate('change', { target: { value: 'Product content 33' } });
    productForm.simulate('submit');
  });

  step('Check opening product by URL', () => {
    renderer.history.push('/product/3');
  });

  step('Opening product by URL works', () => {
    const productForm = content.find('form[name="product"]');

    expect(content.text()).to.include('Edit Product');
    expect(
      productForm
        .find('[name="title"]')
        .at(0)
        .instance().value
    ).to.equal('Product title 33');
    expect(
      productForm
        .find('[name="content"]')
        .at(0)
        .instance().value
    ).to.equal('Product content 33');
    expect(content.text()).to.include('Edit Product');
  });

  step('Comment adding works', done => {
    mutations.addComment = (obj, { input }) => {
      expect(input.productId).to.equal(3);
      expect(input.content).to.equal('Product comment 24');
      done();
      return input;
    };

    const commentForm = content.find('form[name="comment"]');
    commentForm
      .find('[name="content"]')
      .last()
      .simulate('change', { target: { value: 'Product comment 24' } });
    commentForm.last().simulate('submit');
    expect(content.text()).to.include('Product comment 24');
  });

  step('Updates comment form on comment added got from subscription', () => {
    const subscription = renderer.getSubscriptions(COMMENT_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        commentUpdated: {
          mutation: 'CREATED',
          id: 3003,
          productId: 3,
          node: {
            id: 3003,
            content: 'Product comment 3',
            __typename: 'Comment'
          },
          __typename: 'UpdateCommentPayload'
        }
      }
    });

    expect(content.text()).to.include('Product comment 3');
  });

  step('Updates comment form on comment deleted got from subscription', () => {
    const subscription = renderer.getSubscriptions(COMMENT_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        commentUpdated: {
          mutation: 'DELETED',
          id: 3003,
          productId: 3,
          node: {
            id: 3003,
            content: 'Product comment 3',
            __typename: 'Comment'
          },
          __typename: 'UpdateCommentPayload'
        }
      }
    });
    expect(content.text()).to.not.include('Product comment 3');
  });

  step('Comment deleting optimistically removes comment', () => {
    const deleteButtons = content.find('.delete-comment');
    expect(deleteButtons).has.lengthOf(9);
    deleteButtons.last().simulate('click');

    app.update();
    content = app.find('#content').last();
    expect(content.text()).to.not.include('Product comment 24');
    expect(content.find('.delete-comment')).has.lengthOf(6);
  });

  step('Clicking comment delete removes the comment', () => {
    expect(content.text()).to.not.include('Product comment 24');
    expect(content.find('.delete-comment')).has.lengthOf(6);
  });

  step('Comment editing works', done => {
    mutations.editComment = (obj, { input }) => {
      expect(input.productId).to.equal(3);
      expect(input.content).to.equal('Edited comment 2');
      done();
      return input;
    };

    const editButtons = content.find('.edit-comment');
    expect(editButtons).has.lengthOf(6);
    editButtons.last().simulate('click');

    const commentForm = content.find('form[name="comment"]');
    expect(
      commentForm
        .find('[name="content"]')
        .last()
        .instance().value
    ).to.equal('Product comment 2');
    commentForm
      .find('[name="content"]')
      .last()
      .simulate('change', { target: { value: 'Edited comment 2' } });
    commentForm.last().simulate('submit');

    expect(content.text()).to.include('Edited comment 2');
  });

  step('Clicking back button takes to product list', () => {
    const backButton = content.find('#back-button');
    backButton.last().simulate('click', { button: 0 });
    app.update();
    content = app.find('#content').last();
    expect(content.text()).to.include('Product title 3');
  });
});
