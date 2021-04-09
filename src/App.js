import React, { Fragment } from 'react';
import { Provider } from 'react-redux' //使全局可以用store 组件引入connect连接
import Header from './common/header'
import { IconfontStyle } from './statics/iconfont/iconfont'
import store from './store'

const App = () => {
  // } function App () 
  return (
    <Fragment>
      <Provider store={store}>
        <IconfontStyle />
        <Header></Header>
      </Provider>

    </Fragment>
  );
}

export default App;
