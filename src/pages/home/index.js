import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
// import Writer from './components/Writer';
import { actionCreators } from './store';
import { BackTop } from './style';

import {
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './style';
//PureComponent底层有 shouldComponentUpdate不会随着更新子组件全部更新
class Home extends PureComponent {

  handleScrollTop () {
    window.scrollTo(0, 0);
  }

  render () {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className='banner-img' alt='' src="https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png" />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          {/* <Writer /> */}
        </HomeRight>
        { this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}
      </HomeWrapper>
    )
  }

  componentDidMount () {
    this.props.changeHomeData();
    this.bindEvents();
  }

  componentWillUnmount () {
    //销毁
    window.removeEventListener('scroll', this.props.changeScrollTopShow);
  }

  bindEvents () {
    window.addEventListener('scroll', this.props.changeScrollTopShow);
  }

}

const mapState = (state) => ({
  showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch = (dispatch) => ({
  changeHomeData () {
    dispatch(actionCreators.getHomeInfo());
  },
  changeScrollTopShow () {
    if (document.documentElement.scrollTop > 100) {
      dispatch(actionCreators.toggleTopShow(true))
    } else {
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
});

export default connect(mapState, mapDispatch)(Home);
