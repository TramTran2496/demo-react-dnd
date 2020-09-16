import React from 'react'
import Ticket from './Ticket'
import { useDrop } from 'react-dnd'
import { TYPE_TICKET } from '../utility'

const Box = ({ tickets, moveTicket }) => {
  const [, drop] = useDrop({
    accept: [TYPE_TICKET],
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = item.x + delta.x
      const top = item.y + delta.y
      moveTicket(item.id, left < 0 ? 0 : left > 450 ? 450 : left, top < 0 ? 0 : top > 450 ? 450 : top)
    },
  })

  return (
    <div ref={drop} className="box">
      {tickets?.map(({ id, priority, x, y }) => (
        <Ticket key={id} content={id} priority={priority} x={x} y={y} />
      ))}
    </div>
  )
}

export default Box
