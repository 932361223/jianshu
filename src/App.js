import React, { Fragment } from 'react';
import { Provider } from 'react-redux' //使全局可以用store 组件引入connect连接
import { BrowserRouter, Route } from "react-router-dom";
import Header from './common/header'
import { IconfontStyle } from './statics/iconfont/iconfont'
import store from './store'

import Home from './pages/home'
import Detail from './pages/detail'
const App = () => {
  // } function App () 
  return (
    <Fragment>
      <Provider store={store}>
        <IconfontStyle />
        <Header />
        <BrowserRouter>
          <Route path="/" exact component={Home}></Route>
          <Route path="/detail" exact component={Detail}></Route>
        </BrowserRouter>
      </Provider>

    </Fragment>
  );
}

export default App;
