import React from 'react'
import { TYPE_TICKET } from '../utility.js'
import { useDrag } from 'react-dnd'
import { CloseOutlined } from '@ant-design/icons'

const Ticket = ({ index, parent, content, priority, allowDrag, onDelete, onMoveInside }) => {
  const onEndDragging = (draggedItem, monitor) => {
    if (monitor.didDrop()) {
      const { parent: parentId, dropIndex } = monitor.getDropResult() ?? {}
      if (parent !== parentId) {
        onDelete()
      } else {
        const oldIndex = index < dropIndex ? index : index + 1
        onMoveInside(dropIndex, oldIndex, { id: content, priority, parent, allowDrag, type: TYPE_TICKET })
      }
    }
  }

  const [{ isDragging }, drag] = useDrag({
    item: { id: content, priority, parent, allowDrag, type: TYPE_TICKET },
    end: onEndDragging,
    canDrag: allowDrag,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
    <div ref={drag} className={`ticket ${priority} ${isDragging ? 'dragging' : ''} ${allowDrag ? '' : 'disabled'}`}>
      {content}
      <button className="delete-btn" onClick={() => onDelete()}>
        <CloseOutlined />
      </button>
    </div>
  )
}

export default Ticket
