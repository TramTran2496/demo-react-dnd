import React, { useState, useImperativeHandle } from 'react'
import { DropTarget } from 'react-dnd'
import { TYPE_TICKET } from '../utility'

const Pool = React.forwardRef(({ name, connectDropTarget }, ref) => {
  const [list, setList] = useState([])

  useImperativeHandle(
    ref,
    () => ({
      onDrop: (item) => {
        const temp = [...list]
        temp.push(item?.name)
        setList(temp)
      },
    }),
    [list],
  )

  return connectDropTarget(
    <div className="pool">
      <p className="title">{name}</p>
      <span>{list.join(', ')}</span>
    </div>,
  )
})

const dropSpec = {
  drop: (props, monitor, component) => {
    if (component) {
      component.onDrop(monitor.getItem())
    }
  },
}

const collect = (connect) => ({
  connectDropTarget: connect.dropTarget(),
})

export default DropTarget(TYPE_TICKET, dropSpec, collect)(Pool)
