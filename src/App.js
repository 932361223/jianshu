import React, { Fragment } from 'react';
import { Provider } from 'react-redux' //使全局可以用store 组件引入connect连接
import { BrowserRouter, Route } from "react-router-dom";
import Header from './common/header'
import { IconfontStyle } from './statics/iconfont/iconfont'
import Home from './pages/home'
// import Detail from './pages/detail'
import Detail from './pages/detail/loadable.js'; //异步加载组件 组建内获取参数得用withRouter
import Login from './pages/login';
import Write from './pages/write';
import store from './store'
const App = () => {
  // } function App () 
  return (
    <Fragment>
      <Provider store={store}>
        <IconfontStyle />
        <BrowserRouter>
          <Header />
          <Route path="/" exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/write' exact component={Write}></Route>
          <Route path="/detail/:id" exact component={Detail}></Route>
        </BrowserRouter>
      </Provider>

    </Fragment>
  );
}

export default App;
