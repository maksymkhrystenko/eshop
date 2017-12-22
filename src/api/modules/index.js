import product from './Product';
import post from './Post';
import comment from './Comment';
import user from './User';
import Feature from './connector';

export default new Feature(user, post, product, comment);
