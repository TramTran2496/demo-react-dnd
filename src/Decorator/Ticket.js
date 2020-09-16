import React from 'react'
import { DragSource } from 'react-dnd'
import { TYPE_TICKET } from '../utility'

const Ticket = ({ name, isDragging, connectDragSource }) => {
  return (
    <div ref={connectDragSource} className={`ticket ${isDragging ? 'dragging' : ''}`}>
      {name}
    </div>
  )
}

const dragSpec = {
  beginDrag: (props) => ({ name: props.name, type: TYPE_TICKET }),
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: !!monitor.isDragging(),
})

export default DragSource(TYPE_TICKET, dragSpec, collect)(Ticket)
