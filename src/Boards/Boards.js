import React, { useState } from 'react'
import './styles.scss'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { Row, Checkbox, Divider, Button } from 'antd'
import Board from './Board'
import { uuid } from '../utility.js'

const initialBoard = {
  name: 'New board',
  allowDrag: true,
  allowDrop: true,
}

const Boards = () => {
  const gutter = 16

  const [boards, setBoards] = useState([{ ...initialBoard, id: uuid() }])

  const onAddBoard = () => {
    const temp = [...boards, { ...initialBoard, id: uuid() }]
    setBoards(temp)
  }

  const onDeleteBoard = (index) => {
    const temp = boards.slice(0, index).concat(boards.slice(index + 1, boards.length))
    setBoards(temp)
  }

  const onChangeAllowDrag = (index, allowDrag) => {
    const temp = [...boards]
    temp[index] = { ...temp[index], allowDrag }
    setBoards(temp)
  }

  const onChangeAllowDrop = (index, allowDrop) => {
    const temp = [...boards]
    temp[index] = { ...temp[index], allowDrop }
    setBoards(temp)
  }

  const onChangeName = (index, name) => {
    const temp = [...boards]
    temp[index] = { ...temp[index], name }
    setBoards(temp)
  }

  return (
    <div className="screen">
      <Button type="dashed" onClick={onAddBoard}>
        New board
      </Button>
      <Divider />
      <h3>Allow dragging</h3>
      <Row gutter={gutter}>
        {boards.map(({ id, name, allowDrag }, index) => (
          <Checkbox key={id} checked={allowDrag} onChange={(e) => onChangeAllowDrag(index, e.target.checked)}>
            {name}
          </Checkbox>
        ))}
      </Row>
      <br />
      <h3>Allow dropping</h3>
      <Row gutter={gutter}>
        {boards.map(({ id, name, allowDrop }, index) => (
          <Checkbox key={id} checked={allowDrop} onChange={(e) => onChangeAllowDrop(index, e.target.checked)}>
            {name}
          </Checkbox>
        ))}
      </Row>
      <Divider />
      <Row gutter={gutter}>
        <DndProvider backend={HTML5Backend}>
          {boards.map(({ id, name, allowDrag, allowDrop }, index) => (
            <Board
              key={id}
              pid={id}
              title={name}
              allowDrag={allowDrag}
              allowDrop={allowDrop}
              onChangeTitle={(title) => onChangeName(index, title)}
              onDelete={() => onDeleteBoard(index)}
            />
          ))}
        </DndProvider>
      </Row>
    </div>
  )
}

export default Boards
