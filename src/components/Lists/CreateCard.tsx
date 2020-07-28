import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createCard } from "store/reducers/tasks";
import { addListCard } from "store/reducers/columns";
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

const CreateCard: React.FC<{ listId: string }> = ({ listId }) => {
  const dispatch = useDispatch();
  const [cardName, setCardName] = useState("");
  const create = () => {
    const taskId: string = uuid.v4();
    dispatch(createCard(taskId, cardName));
    dispatch(addListCard(listId, taskId, cardName));
    setCardName("");
  };
  return (
    <CreateCardWrapper>
      <Input
        placeholder="Add create card"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCardName(e.target.value)
        }
        value={cardName}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.keyCode === 13 && cardName) {
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

export default CreateCard;
