import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { category } from './category.reducer';
import { bookmark } from './bookmark.reducer';
import { user } from './user.reducer';

const rootReducer = combineReducers({
    authentication,
    category,
    bookmark,
    user
});

export default rootReducer;