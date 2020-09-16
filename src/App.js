import React, { useState } from 'react'
import './App.scss'
import Boards from './Boards/Boards'
import Pool from './Pool/Pool'
import Decorator from './Decorator/Decorator'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'

function App() {
  const [current, setCurrent] = useState([])

  const handleClick = (e) => {
    setCurrent([e.key])
  }

  return (
    <>
      <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
        <Menu.Item key="/">
          <Link to="/">Hooks</Link>
        </Menu.Item>
        <Menu.Item key="/pool">
          <Link to="/pool">Pool</Link>
        </Menu.Item>
        <Menu.Item key="/decorator">
          <Link to="/decorator">Decorator</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/" exact component={Boards} />
        <Route path="/pool" exact component={Pool} />
        <Route path="/decorator" exact component={Decorator} />
      </Switch>
    </>
  )
}

export default withRouter(App)
