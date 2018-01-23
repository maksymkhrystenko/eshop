import { expect } from 'chai';
import _ from 'lodash';

import Renderer from '../../../../client/testHelpers/Renderer';
import POSTS_SUBSCRIPTION from '../graphql/PostsSubscription.graphql';
import POST_SUBSCRIPTION from '../graphql/PostSubscription.graphql';
import COMMENT_SUBSCRIPTION from '../graphql/CommentSubscription.graphql';

const createNode = id => ({
  id: `${id}`,
  title: `Post title ${id}`,
  content: `Post content ${id}`,
  comments: [
    { id: id * 1000 + 1, content: 'Post comment 1', __typename: 'Comment' },
    { id: id * 1000 + 2, content: 'Post comment 2', __typename: 'Comment' }
  ],
  __typename: 'Post'
});

const mutations = {
  editPost: true,
  addComment: true,
  editComment: true
};

const mocks = {
  Query: () => ({
    posts(ignored, { offset }) {
      const totalCount = 4;
      const edges = [];
      for (let i = +offset + 1; i <= +offset + 2; i++) {
        edges.push({
          cursor: i,
          node: createNode(i),
          __typename: 'PostEdges'
        });
      }
      return {
        totalCount,
        edges,
        pageInfo: {
          endCursor: edges[edges.length - 1].cursor,
          hasNextPage: true,
          __typename: 'PostPageInfo'
        },
        __typename: 'Posts'
      };
    },
    post(obj, { id }) {
      return createNode(id);
    }
  }),
  Mutation: () => ({
    deletePost: (obj, { id }) => createNode(id),
    deleteComment: (obj, { input }) => input,
    ...mutations
  })
};

describe('Posts and comments example UI works', () => {
  const renderer = new Renderer(mocks, {});
  let app;
  let content;

  beforeEach(() => {
    // Reset spy mutations on each step
    Object.keys(mutations).forEach(key => delete mutations[key]);
    if (app) {
      app.update();
      content = app.find('#content').last();
    }
  });

  it('Posts page renders without data', () => {
    app = renderer.mount();
    renderer.history.push('/posts');
    app.update();
    content = app.find('#content').last();
    expect(content.text()).to.include('Loading...');
  });

  it('Posts page renders with data', () => {
    expect(content.text()).to.include('Post title 1');
    expect(content.text()).to.include('Post title 2');
    expect(content.text()).to.include('2 / 4');
  });

  it('Clicking load more works', () => {
    const loadMoreButton = content.find('#load-more').last();
    loadMoreButton.simulate('click');
  });

  it('Clicking load more loads more posts', () => {
    console.log(8998989);
    console.log(content.text());
    expect(content.text()).to.include('Post title 3');
    expect(content.text()).to.include('Post title 4');
    expect(content.text()).to.include('4 / 4');
  });

 /* it('Check subscribed to post list updates', () => {
    expect(renderer.getSubscriptions(POSTS_SUBSCRIPTION)).has.lengthOf(1);
  });

  it('Updates post list on post delete from subscription', () => {
    const subscription = renderer.getSubscriptions(POSTS_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        postsUpdated: {
          mutation: 'DELETED',
          node: createNode(2),
          __typename: 'UpdatePostPayload'
        }
      }
    });

    expect(content.text()).to.not.include('Post title 2');
    expect(content.text()).to.include('3 / 3');
  });

  it('Updates post list on post create from subscription', () => {
    const subscription = renderer.getSubscriptions(POSTS_SUBSCRIPTION)[0];
    subscription.next(
      _.cloneDeep({
        data: {
          postsUpdated: {
            mutation: 'CREATED',
            node: createNode(2),
            __typename: 'UpdatePostPayload'
          }
        }
      })
    );

    expect(content.text()).to.include('Post title 2');
    expect(content.text()).to.include('4 / 4');
  });

  it('Clicking delete optimistically removes post', () => {
    mutations.deletePost = (obj, { id }) => {
      return createNode(id);
    };

    const deleteButtons = content.find('.delete-button');
    expect(deleteButtons).has.lengthOf(12);
    deleteButtons.last().simulate('click');

    expect(content.text()).to.not.include('Post title 4');
    expect(content.text()).to.include('3 / 3');
  });

  it('Clicking delete removes the post', () => {
    expect(content.text()).to.include('Post title 3');
    expect(content.text()).to.not.include('Post title 4');
    expect(content.text()).to.include('3 / 3');
  });

  it('Clicking on post works', () => {
    const postLinks = content.find('.post-link');
    postLinks.last().simulate('click', { button: 0 });
  });

  it('Clicking on post opens post form', () => {
    const postForm = content.find('form[name="post"]');

    expect(content.text()).to.include('Edit Post');
    expect(
      postForm
        .find('[name="title"]')
        .last()
        .instance().value
    ).to.equal('Post title 3');
    expect(
      postForm
        .find('[name="content"]')
        .last()
        .instance().value
    ).to.equal('Post content 3');
  });

  it('Check subscribed to post updates', () => {
    expect(renderer.getSubscriptions(POST_SUBSCRIPTION)).has.lengthOf(1);
  });

  it('Updates post form on post updated from subscription', () => {
    const subscription = renderer.getSubscriptions(POST_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        postUpdated: {
          id: '3',
          title: 'Post title 203',
          content: 'Post content 204',
          __typename: 'Post'
        }
      }
    });
    const postForm = content.find('form[name="post"]');

    expect(
      postForm
        .find('[name="title"]')
        .last()
        .instance().value
    ).to.equal('Post title 203');
    expect(
      postForm
        .find('[name="content"]')
        .last()
        .instance().value
    ).to.equal('Post content 204');
  });

  it('Post editing form works', done => {
    mutations.editPost = (obj, { input }) => {
      expect(input.id).to.equal(3);
      expect(input.title).to.equal('Post title 33');
      expect(input.content).to.equal('Post content 33');
      done();
      return input;
    };

    const postForm = app.find('form[name="post"]').last();
    postForm
      .find('[name="title"]')
      .last()
      .simulate('change', { target: { value: 'Post title 33' } });
    postForm
      .find('[name="content"]')
      .last()
      .simulate('change', { target: { value: 'Post content 33' } });
    postForm.simulate('submit');
  });

  it('Check opening post by URL', () => {
    renderer.history.push('/post/3');
  });

  it('Opening post by URL works', () => {
    const postForm = content.find('form[name="post"]');

    expect(content.text()).to.include('Edit Post');
    expect(
      postForm
        .find('[name="title"]')
        .at(0)
        .instance().value
    ).to.equal('Post title 33');
    expect(
      postForm
        .find('[name="content"]')
        .at(0)
        .instance().value
    ).to.equal('Post content 33');
    expect(content.text()).to.include('Edit Post');
  });

  it('Comment adding works', done => {
    mutations.addComment = (obj, { input }) => {
      expect(input.postId).to.equal(3);
      expect(input.content).to.equal('Post comment 24');
      done();
      return input;
    };

    const commentForm = content.find('form[name="comment"]');
    commentForm
      .find('[name="content"]')
      .last()
      .simulate('change', { target: { value: 'Post comment 24' } });
    commentForm.last().simulate('submit');
    expect(content.text()).to.include('Post comment 24');
  });

  it('Updates comment form on comment added got from subscription', () => {
    const subscription = renderer.getSubscriptions(COMMENT_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        commentUpdated: {
          mutation: 'CREATED',
          id: 3003,
          postId: 3,
          node: {
            id: 3003,
            content: 'Post comment 3',
            __typename: 'Comment'
          },
          __typename: 'UpdateCommentPayload'
        }
      }
    });

    expect(content.text()).to.include('Post comment 3');
  });

  it('Updates comment form on comment deleted got from subscription', () => {
    const subscription = renderer.getSubscriptions(COMMENT_SUBSCRIPTION)[0];
    subscription.next({
      data: {
        commentUpdated: {
          mutation: 'DELETED',
          id: 3003,
          postId: 3,
          node: {
            id: 3003,
            content: 'Post comment 3',
            __typename: 'Comment'
          },
          __typename: 'UpdateCommentPayload'
        }
      }
    });
    expect(content.text()).to.not.include('Post comment 3');
  });

  it('Comment deleting optimistically removes comment', () => {
    const deleteButtons = content.find('.delete-comment');
    expect(deleteButtons).has.lengthOf(9);
    deleteButtons.last().simulate('click');

    app.update();
    content = app.find('#content').last();
    expect(content.text()).to.not.include('Post comment 24');
    expect(content.find('.delete-comment')).has.lengthOf(6);
  });

  it('Clicking comment delete removes the comment', () => {
    expect(content.text()).to.not.include('Post comment 24');
    expect(content.find('.delete-comment')).has.lengthOf(6);
  });

  it('Comment editing works', done => {
    mutations.editComment = (obj, { input }) => {
      expect(input.postId).to.equal(3);
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
    ).to.equal('Post comment 2');
    commentForm
      .find('[name="content"]')
      .last()
      .simulate('change', { target: { value: 'Edited comment 2' } });
    commentForm.last().simulate('submit');

    expect(content.text()).to.include('Edited comment 2');
  });

  it('Clicking back button takes to post list', () => {
    const backButton = content.find('#back-button');
    backButton.last().simulate('click', { button: 0 });
    app.update();
    content = app.find('#content').last();
    expect(content.text()).to.include('Post title 3');
  });*/
});
