import asyncComponent from '../../common/utils/asyncComponent';

export const Product = asyncComponent(() => import('./containers/Product'));
export const ProductEdit = asyncComponent(() => import('./containers/ProductEdit'));
export const ProductCard = asyncComponent(() => import('./containers/ProductCard'));
