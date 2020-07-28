import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createTask } from "store/reducers/task";
import { addColumnTask } from "store/reducers/column";
import uuid from "uuid";

const CreateCardWrapper = styled.div`
  position: relative;
  padding: 5px;
  box-sizing: border-box;
`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -10px;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 14px;
  outline: none;
  border-radius: 4px;
  border: none;
`;

const CreateTask: React.FC<{ listId: string }> = ({ listId }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const create = () => {
    const taskId: string = uuid.v4();
    dispatch(createTask(taskId, taskName));
    dispatch(addColumnTask(listId, taskId, taskName));
    setTaskName("");
  };
  return (
    <CreateCardWrapper>
      <Input
        placeholder="Add create task"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTaskName(e.target.value)
        }
        value={taskName}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.keyCode === 13 && taskName) {
            create();
          }
        }}
      />
      <Icon>
        <FontAwesomeIcon
          icon={faPlus}
          size="sm"
          color="rgba(0,0,0,0.5)"
          onClick={() => create()}
        />
      </Icon>
    </CreateCardWrapper>
  );
};

export default CreateTask;
