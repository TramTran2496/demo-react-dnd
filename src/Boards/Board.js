import React, { useState } from 'react'
import { Card, Input, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { uuid, randomPriority } from '../utility.js'
import TicketContainer, { TicketHolder } from './TicketContainer'

const Board = ({ pid, title, allowDrag, allowDrop, onChangeTitle, onDelete }) => {
  const [tickets, setTickets] = useState([{ priority: randomPriority(), id: uuid() }])

  const onAddTicket = () => {
    const temp = [...tickets, { id: uuid(), priority: randomPriority() }]
    setTickets(temp)
  }

  const onDeleteTicket = (index) => {
    const temp = tickets.slice(0, index).concat(tickets.slice(index + 1, tickets.length))
    setTickets(temp)
  }

  const onDropTicket = (index, ticket) => {
    let temp = tickets.slice(0, index)
    temp.push(ticket)
    temp = temp.concat(tickets.slice(index, tickets.length))
    setTickets(temp)
  }

  const onMoveInside = (dropIndex, index, ticket) => {
    let temp = tickets.slice(0, dropIndex)
    temp.push(ticket)
    temp = temp.concat(tickets.slice(dropIndex, tickets.length))
    temp = temp.slice(0, index).concat(temp.slice(index + 1, temp.length))
    setTickets(temp)
  }

  return (
    <Card
      title={<Input bordered={false} value={title} onChange={(e) => onChangeTitle(e.target.value)} />}
      extra={<Button shape="circle" icon={<CloseOutlined />} type="danger" ghost onClick={onDelete} />}
      className="board"
    >
      {tickets.map(({ id, priority }, index) => (
        <TicketContainer
          key={`${id}${index}`}
          index={index}
          content={id}
          parent={pid}
          priority={priority}
          allowDrag={allowDrag}
          allowDrop={allowDrop}
          onDelete={(oldIndex) => onDeleteTicket(oldIndex ?? index)}
          onDrop={(ticket) => onDropTicket(index, ticket)}
          onMoveInside={onMoveInside}
        />
      ))}
      {allowDrop && (
        <TicketHolder
          allowDrop={allowDrop}
          onDrop={(ticket) => onDropTicket(tickets.length, ticket)}
          parent={pid}
          index={tickets.length}
        />
      )}
      <Button type="dashed" onClick={onAddTicket}>
        New ticket
      </Button>
    </Card>
  )
}

export default Board
