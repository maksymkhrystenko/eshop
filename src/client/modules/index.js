import home from './Home';
import post from './Post';
import pageNotFound from './PageNotFound';
import user from './User';
import file from './File';
import ui from '../common';

import Feature from './connector';

export default new Feature(user, file, home, post, pageNotFound, ui);
