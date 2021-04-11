// import { combineReducers } from "redux";
//获取数据可以用state.get('header').get('focused') || state.getIn(['header', 'focused'])
import { combineReducers } from "redux-immutable";
import { reducer as headerReducer } from '../common/header/store'
export default combineReducers({
  header: headerReducer
})