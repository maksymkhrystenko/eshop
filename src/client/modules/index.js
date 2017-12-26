import home from './Home';
import post from './Product';
import product from './Post';
import pageNotFound from './PageNotFound';
import user from './User';
import file from './File';
import dashboard from './Dashboard';
import ui from '../common';

import Feature from './connector';

/*const adminFeature = new Feature(dashboard);
const eShopFeature = new Feature(user, file, home, post, pageNotFound, ui, dashboard);

export default { eShopFeature, adminFeature };*/

export default new Feature(user, file, home, post, product, pageNotFound, ui, dashboard);
