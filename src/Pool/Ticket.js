import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { TYPE_TICKET } from '../utility'
import logo from '../logo.svg'

const Ticket = ({ content, priority, x, y }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { id: content, priority, x, y, type: TYPE_TICKET },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <>
      <DragPreviewImage connect={preview} src={logo} />
      <div ref={drag} className={`ticket ${priority} ${isDragging ? 'dragging' : ''}`} style={{ top: y, left: x }}>
        {content}
      </div>
    </>
  )
}

export default Ticket
