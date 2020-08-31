import React, { useRef, useState } from "react";
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

const ColumnHeaderContainer = styled.div`
  height: 40px;
  width: 100%;
  padding: 4px;
  box-sizing: border-box;
  cursor: pointer;
`;
const HeaderInput = styled.input`
  background-color: rgba(255, 255, 255, 0);
  user-select: none;
  font-size: 14px;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: bold;
  outline: none;
  border-radius: 2px;
  border: ${(props: { isFocus: boolean }) =>
    props.isFocus ? "2px solid #026aa7" : "1px solid rgba(0,0,0,0)"};
  cursor: ${(props: { isFocus: boolean }) =>
    props.isFocus ? "auto" : "pointer"};
`;

interface ListsProps {
  tasks: TaskType[];
  column: ColumnType;
  index: number;
}
const Column: React.FC<ListsProps> = ({ tasks, column }) => {
  const [title, setTitle] = useState<string>(column.title);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  return (
    <ListsWrapper>
      <ListsContent>
        <ColumnHeaderContainer
          onClick={() => {
            setIsFocus(true);
            if (inputEl && inputEl.current) {
              inputEl.current.focus();
            }
          }}
        >
          <HeaderInput
            type="text"
            ref={inputEl}
            isFocus={isFocus}
            defaultValue={title}
            onBlur={() => setIsFocus(false)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              dispatch(updateColumnTitle(column.id, e.target.value));
            }}
          />
        </ColumnHeaderContainer>
        <Droppable droppableId={column.id} type="task">
          {provided => (
            <ListsStyle
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((task: TaskType, index: number) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
              <CreateTask listId={column.id} />
            </ListsStyle>
          )}
        </Droppable>
      </ListsContent>
    </ListsWrapper>
  );
};

export default Column;
