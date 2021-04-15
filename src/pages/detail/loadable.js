import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading () {
    // 异步加载之前提醒
    return <div>正在加载</div>
  }
});

export default () => <LoadableComponent />
