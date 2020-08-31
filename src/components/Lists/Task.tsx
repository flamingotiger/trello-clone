import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { TaskType, updateTask } from "store/reducers/task";
import { Draggable } from "react-beautiful-dnd";

const Icon = styled.div`
  position: absolute;
  z-index: 100;
  right: 10px;
  margin-top: 8px;
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

const Container = styled.li`
  display: flex;
  margin-right: 8px;
  margin-left: 8px;
  margin-bottom: 8px;
  z-index: 0;
  min-height: 36px;
  box-sizing: border-box;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  &:hover {
    background: rgba(0, 0, 0, 0.02);
    ${Icon} {
      display: flex;
    }
  }
`;

const TaskName = styled.span`
  display: block;
  width: 100%;
  padding: 8px;
  margin: 0;
  min-height: 36px;
  font-size: 14px;
  box-sizing: border-box;
  word-break: break-word;
  line-height: 18px;
`;

const Dim = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 9998;
`;

const TextContainer = styled.div`
  position: absolute;
  top: ${(props: { dimension: { top: number; left: number } }) =>
    props.dimension.top}px;
  left: ${(props: { dimension: { top: number; left: number } }) =>
    props.dimension.left}px;
`;
const Buttons = styled.div`
  display: flex;
  margin-top: 10px;
`;
const Button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  ${Button};
  background-color: #e61e3f;
  &:hover {
    background-color: #ff3d5d;
  }
`;
const SaveButton = styled.button`
  ${Button};
  margin-right: 10px;
  background-color: #026aa7;
  &:hover {
    background-color: #0081cc;
  }
`;

const Textarea = styled.textarea`
  min-height: 100px;
  width: 256px;
  border: none;
  background: none;
  font-size: 14px;
  outline: none;
  resize: none;
  background-color: white;
  border-radius: 3px;
  margin: 0;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.3);
`;

interface TaskProps {
  task: TaskType;
  index: number;
}
const Task: React.FC<TaskProps> = ({ task, index }) => {
  const [dimension, setDimension] = useState({ left: 0, top: 0 });
  const [value, setValue] = useState<string>(task.taskName);
  const location = useLocation();
  const history = useHistory();
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const taskEl = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [inputDisabled, setInputDisabled] = useState(true);

  useEffect(() => {
    if (taskEl && taskEl.current) {
      const { left, top } = taskEl.current.getBoundingClientRect();
      setDimension({ left, top });
    }
  }, [index]);
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TaskName
              ref={taskEl}
              onClick={() => history.replace(`${location.pathname}/${task.id}`)}
            >
              {task.taskName}
            </TaskName>

            <Icon
              onClick={() => {
                setInputDisabled(false);
                if (textareaEl && textareaEl.current) {
                  textareaEl.current.focus();
                }
              }}
            >
              <FontAwesomeIcon icon={faPen} size="sm" color="rgba(0,0,0,0.5)" />
            </Icon>
          </Container>
        )}
      </Draggable>
      {!inputDisabled && (
        <Dim>
          <TextContainer dimension={dimension}>
            <Textarea
              ref={textareaEl}
              defaultValue={value}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setValue(e.target.value)
              }
            />
            <Buttons>
              <SaveButton
                onClick={() => {
                  dispatch(updateTask(task.id, value));
                  setInputDisabled(true);
                }}
              >
                Save
              </SaveButton>
              <CloseButton onClick={() => setInputDisabled(true)}>
                Close
              </CloseButton>
            </Buttons>
          </TextContainer>
        </Dim>
      )}
    </>
  );
};

export default Task;
