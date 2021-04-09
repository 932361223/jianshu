import React, { Component, Fragment } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from 'react-redux'
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
const Header = (props) => {
  return (
    <Fragment>
      <HeaderWrapper >
        <Logo />
        <Nav>
          <NavItem className="left">首页</NavItem>
          <NavItem className="left">下载APP</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">
            <i className="iconfont" >&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={props.focused}
              timeout={200}
              classNames="slide"
            >
              <NavSearch
                onFocus={props.handleInputFocus}
                onBlur={props.handleInputBlur}
                className={props.focused ? 'focused ' : ''}></NavSearch>
            </CSSTransition>

            <i className={props.focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe604;</i>
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className="writting">写文章</Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    </Fragment >

  )

}
// class Header extends Component {

//   render () {
//     return (

//     );
//   }
//   // handleInputFocus () {
//   //   this.setState((state) => state.focused = true)
//   // }
//   // handleInputBlur () {
//   //   this.setState((state) => state.focused = false)
//   // }
// }
const mapStateToProps = (state) => {
  return {
    focused: state.header.focused
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus () {
      const actions = {
        type: 'search_focus'
      }
      dispatch(actions)
    },
    handleInputBlur () {
      const actions = {
        type: 'search_blur'
      }
      dispatch(actions)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)