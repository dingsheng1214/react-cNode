import React from 'react';
import Routes from '../config/router'
import AppBar from './layout/app-bar'


const App = () => (
  <div>
    <AppBar />
    <Routes key="routes" />
  </div>
)
export default App

// Routes 提供全局路由
