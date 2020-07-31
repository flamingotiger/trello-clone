import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { TaskType, updateTask } from "store/reducers/task";
import { Draggable } from "react-beautiful-dnd";

const ListCardStyle = styled.li`
  list-style: none;
  flex: 1 1 auto;
  margin-bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  z-index: 1;
  min-height: 0;
`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  display: none;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ListCardContent = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
  padding: 8px;
  box-sizing: border-box;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
    ${Icon} {
      display: flex;
    }
  }
`;

const ListCardInput = styled.input`
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
`;

interface TaskProps {
  task: TaskType;
  index: number;
}
const Task: React.FC<TaskProps> = ({ task, index }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <ListCardStyle
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListCardContent>
            <ListCardInput
              ref={inputEl}
              defaultValue={task.taskName}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const value = e.currentTarget.value;
                if (e.keyCode === 13 && value) {
                  dispatch(updateTask(task.id, e.currentTarget.value));
                  e.currentTarget.blur();
                }
              }}
            />
            <Icon
              onClick={() => {
                if (inputEl && inputEl.current) {
                  inputEl.current.focus();
                }
              }}
            >
              <FontAwesomeIcon icon={faPen} size="sm" color="rgba(0,0,0,0.5)" />
            </Icon>
          </ListCardContent>
        </ListCardStyle>
      )}
    </Draggable>
  );
};

export default Task;
