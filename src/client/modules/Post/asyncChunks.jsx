import asyncComponent from '../../common/utils/asyncComponent';

export const Post = asyncComponent(() => import('./containers/Post'));
export const PostEdit = asyncComponent(() => import('./containers/PostEdit'));
