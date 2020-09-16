import React, { useState } from 'react'
import { Button } from 'antd'
import Box from './Box'
import './styles.scss'
import { uuid, randomPriority } from '../utility.js'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Pool = () => {
  const [tickets, setTickets] = useState([])

  const onAddTicket = () => {
    const temp = [
      ...tickets,
      { id: uuid(), priority: randomPriority(), x: Math.random() * 450, y: Math.random() * 450 },
    ]
    setTickets(temp)
  }

  const moveTicket = (id, x, y) => {
    const temp = [...tickets]
    for (const ticket of temp) {
      if (ticket.id === id) {
        ticket.x = x
        ticket.y = y
        break
      }
    }
    setTickets(temp)
  }

  return (
    <div className="screen">
      <Button type="dashed" onClick={onAddTicket}>
        New ticket
      </Button>
      <DndProvider backend={HTML5Backend}>
        <Box tickets={tickets} moveTicket={moveTicket} />
      </DndProvider>
    </div>
  )
}

export default Pool
