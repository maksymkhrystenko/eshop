import asyncComponent from '../../common/utils/asyncComponent';

export const PageNotFound = asyncComponent(() =>
  import('./containers/PageNotFound')
);
