import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Task from "./Task";
import { updateColumnTitle, ColumnType } from "store/reducers/column";
import CreateTask from "./CreateTask";
import { TaskType } from "store/reducers/task";
import { Droppable } from "react-beautiful-dnd";

const ListsWrapper = styled.div`
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

const ListsContent = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;

const ListsStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListHeader = styled.input`
  background-color: rgba(255, 255, 255, 0);
  border: 0 none;
  user-select: none;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  padding-left: 10px;
  font-weight: bold;
`;

interface ListsProps {
  tasks: TaskType[];
  column: ColumnType;
  index: number;
}
const Lists: React.FC<ListsProps> = ({ tasks, column }) => {
  const dispatch = useDispatch();
  return (
    <ListsWrapper>
      <ListsContent>
        <ListHeader
          type="text"
          defaultValue={column.title}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            if (e.keyCode === 13 && value) {
              dispatch(updateColumnTitle(column.id, e.currentTarget.value));
              e.currentTarget.blur();
            }
          }}
        />
        <Droppable droppableId={column.id} type="task">
          {(provided) => (
            <ListsStyle ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task: TaskType, index: number) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </ListsStyle>
          )}
        </Droppable>
        <CreateTask listId={column.id} />
      </ListsContent>
    </ListsWrapper>
  );
};

export default Lists;
