import React from 'react'
import { TYPE_TICKET } from '../utility.js'
import { useDrop } from 'react-dnd'
import Ticket from './Ticket'

const TicketContainer = ({
  parent,
  index,
  content,
  priority,
  allowDrag,
  allowDrop,
  onDelete,
  onDrop,
  onMoveInside,
}) => {
  const [{ isHover, isHighlight }, drop] = useDrop({
    accept: [TYPE_TICKET],
    drop: (item) => {
      if (item?.parent !== parent) {
        onDrop(item)
      }
      return { parent, dropIndex: index }
    },
    canDrop: () => allowDrop,
    collect: (monitor) => ({
      isHighlight: monitor.canDrop(),
      isHover: !!monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} className={`container ${isHighlight ? 'highlighted' : isHover ? 'banned' : ''}`}>
      {isHover && allowDrop && (
        <div className="container">
          <div className="ticket preview">content</div>
        </div>
      )}
      <Ticket
        content={content}
        priority={priority}
        allowDrag={allowDrag}
        onDelete={onDelete}
        parent={parent}
        index={index}
        onMoveInside={onMoveInside}
      />
    </div>
  )
}

export default TicketContainer

export const TicketHolder = ({ index, parent, allowDrop, onDrop }) => {
  const [{ isHover, isHighlight }, drop] = useDrop({
    accept: [TYPE_TICKET],
    drop: (item) => {
      if (item?.parent !== parent) {
        onDrop(item)
      }
      return { parent, dropIndex: index }
    },
    canDrop: () => allowDrop,
    collect: (monitor) => ({
      isHighlight: monitor.canDrop(),
      isHover: !!monitor.isOver(),
    }),
  })

  return (
    <div ref={drop} className={`container ${isHighlight ? 'highlighted' : isHover ? 'banned' : ''}`}>
      <div className={`ticket ${isHover ? 'preview' : 'placeholder'}`}>Drop here</div>
    </div>
  )
}
