import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';//异步加载得是loadable,获取不到页面params,用这个可以解决
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';

class Detail extends PureComponent {
  render () {
    return (
      <DetailWrapper>
        <Header>{this.props.title}</Header>
        <Content
          dangerouslySetInnerHTML={{ __html: this.props.content }}
        />
      </DetailWrapper>
    )
  }

  componentDidMount () {
    //获取页面id  App.js /detail/:id 也可以 直接?id= 得用location.search获取
    this.props.getDetail(this.props.match.params.id);
  }
}

const mapState = (state) => ({
  title: state.getIn(['detail', 'title']),
  content: state.getIn(['detail', 'content'])
});

const mapDispatch = (dispatch) => ({
  getDetail (id) {
    dispatch(actionCreators.getDetail(id));
  }
});

export default connect(mapState, mapDispatch)(withRouter(Detail));
