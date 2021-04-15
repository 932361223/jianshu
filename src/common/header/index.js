import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { actionCreators } from './store'
//引入别人的actionCreators
import { actionCreators as loginActionCreators } from '../../pages/login/store'

import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button,
} from './style';

class Header extends Component {
  getListArea () {
    const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props
    const newList = list.toJS()//fromJS类型，得转换成普通JS数组
    const pageList = []
    // 刚进页面List为空，拿不到key，会报错
    if (newList.length) {
      for (let i = (page - 1) * 10; i < page * 10; i++) {
        pageList.push(<SearchInfoItem key={newList[i]} >{newList[i]}</SearchInfoItem >)
      }
    }
    if (focused || mouseIn) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <SearchInfoTitle>热门搜索
                <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
              <i ref={icon => this.spinIcon = icon} className="iconfont spin" >&#xe851;</i>
                  换一批</SearchInfoSwitch>
          </SearchInfoTitle>
          <div>
            <SearchInfoList>
              {/* {list.map(item => <SearchInfoItem key={item}>{item}</SearchInfoItem>)} */}
              {pageList}
            </SearchInfoList>
          </div>
        </SearchInfo>
      )
    }
  }
  render (h) {
    const { focused, handleInputFocus, handleInputBlur, list, login, logout } = this.props
    return (
      <Fragment>
        <HeaderWrapper >
          <Link to='/'>
            <Logo />
          </Link>
          <Logo />
          <Nav>
            <NavItem className="left">首页</NavItem>
            <NavItem className="left">下载APP</NavItem>
            {
              login ?
                <NavItem onClick={logout} className='right'>退出</NavItem> :
                <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
            }
            <NavItem className="right">
              <i className="iconfont" >&#xe636;</i>
            </NavItem>
            <SearchWrapper>
              <CSSTransition
                in={focused}
                timeout={200}
                classNames="slide"
              >
                <NavSearch
                  onFocus={() => handleInputFocus(list)}
                  onBlur={handleInputBlur}
                  className={focused ? 'focused ' : ''}></NavSearch>
              </CSSTransition>
              <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe604;</i>
              {this.getListArea()}
            </SearchWrapper>
          </Nav>
          <Addition>
            <Link to="/write">
              <Button className="writting">写文章</Button>
            </Link>
            <Button className="reg">注册</Button>
          </Addition>
        </HeaderWrapper>
      </Fragment >

    )
  }
}


const mapStateToProps = (state) => {
  return {
    // focused: state.header.get('focused')
    // focused: state.get('header').get('focused')
    focused: state.getIn(['header', 'focused']),
    list: state.getIn(['header', 'list']),
    page: state.getIn(['header', 'page']),
    totalPage: state.getIn(['header', 'totalPage']),
    mouseIn: state.getIn(['header', 'mouseIn']),
    login: state.getIn(['login', 'login'])
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus (list) {
      // 数组长度为0就获取列表
      (!list.size) && dispatch(actionCreators.getList())
      // const actions = {
      //   type: 'search_focus'
      // }
      // dispatch(actions)
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur () {
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter () {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave () {
      dispatch(actionCreators.mouseLeave());
    },
    handleChangePage (page, totalPage, spin) {
      //icon旋转 originAngle取360 720...
      let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        // 第一次初始化为0
        originAngle = 0;
      }
      spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
      if (page < totalPage) {
        dispatch(actionCreators.changePage(page + 1))
      } else {
        dispatch(actionCreators.changePage(1))
      }
    },
    logout () {
      dispatch(loginActionCreators.logout())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)