#

## 目录结构

  + views: 存放项目功能模块的页面，需要根据路由配置情况分割子级目录

  + config: 存放一些配置文件，比如第三方类库引用，路由配置等

  + store: 存放项目store相关的文件，包括数据获取的封装等

  + components: 存放非业务组件，或者在多个业务间都需要用到的功能组件

## 路由

### 什么是路由？

> 路由是用来区分一个网站不同功能模块的地址，浏览器通过访问同一站点下的不同路由，来访问网站的不同功能。同样路由也能让开发者区分返回的内容

### 如何做前端路由

> HTML5 API中的 history 能够让我们控制url跳转之后并不刷新页面，而是交给js代码进行相应的操作，在history api 出现之前，我们可以使用hash跳转来实现

  ```sh
  yarn add react-router-dom
  ```

### Route && Redirect

  ```js
  //router.jsx
  export default () => [
    <Route path="/" render={() => <Redirect to="/list" />} exact />,
    <Route path="/" component={TopicList} exact />,
    <Route path="/detail" component={TopicDetail} exact />,
  ]
  ```

### Link

  ```js
  //app.jsx
  render() {
    return [
      <div>
        <Link to="/">首页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes />,
    ]
  }
  ```

### BrowserRouter

  ```js
  // app.js
  import { BrowserRouter } from 'react-router-dom'
  import App from './views/App'
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ```
