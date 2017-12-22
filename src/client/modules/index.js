import home from './Home';
import post from './Post';
import pageNotFound from './PageNotFound';
import user from './User';
import ui from '../common';

import Feature from './connector';

export default new Feature(user, home, post, pageNotFound, ui);
