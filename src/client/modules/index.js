import home from './Home';
import post from './Post';
import pageNotFound from './PageNotFound';
//import './favicon';
//import ui from './ui-bootstrap';
import ui from '../common/';

import Feature from './connector';

export default new Feature(home, post, pageNotFound, ui);
