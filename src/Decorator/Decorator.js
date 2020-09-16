import React from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import './styles.scss'
import { Row, Col } from 'antd'
import Ticket from './Ticket'
import Pool from './Pool'

const gutter = 16

const Decorator = () => (
  <div className="screen decorator">
    <DndProvider backend={HTML5Backend}>
      <Row gutter={gutter}>
        <Col span={8}>
          <Ticket name="Task 1" />
        </Col>
        <Col span={8}>
          <Ticket name="Task 2" />
        </Col>
        <Col span={8}>
          <Ticket name="Task 3" />
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={12}>
          <Pool name="TODO" />
        </Col>
        <Col span={12}>
          <Pool name="DOING" />
        </Col>
      </Row>
    </DndProvider>
  </div>
)

export default Decorator
