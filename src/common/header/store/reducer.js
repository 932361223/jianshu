import { constants } from './index'
import { fromJS } from "immutable"; //防止更改state
const defaultState = fromJS({
  focused: false,
  mouseIn: false,
  list: [],
  page: 1,
  totalPage: 1
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.SEARCH_FOCUS:
      // return {
      //   focused: true
      // }
      return state.set('focused', true)
    case constants.SEARCH_BLUR:
      return state.set('focused', false)
    case constants.CHANGE_LIST:
      // return state.set('List', action.data).set('totalPage', action.totalPage)
      return state.merge({
        list: action.data,
        totalPage: action.totalPage
      });
    case constants.MOUSE_ENTER:
      return state.set('mouseIn', true);
    case constants.MOUSE_LEAVE:
      return state.set('mouseIn', false);
    case constants.CHANGE_PAGE:
      return state.set('page', action.page);
    default:
      return state
  }

}