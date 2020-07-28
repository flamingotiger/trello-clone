import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createColumn } from "store/reducers/column";
import { useParams } from "react-router-dom";

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
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ListHeader = styled.input`
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
  border: 0 none;
  user-select: none;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  padding-left: 10px;
  font-weight: bold;
  &::placeholder {
    color: #fff;
  }
`;

const CreateColumn: React.FC = () => {
  const { id: boardId } = useParams();
  const dispatch = useDispatch();
  return (
    <ListsWrapper>
      <ListsContent>
        <ListHeader
          type="text"
          placeholder="Create lists"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            const value = e.currentTarget.value;
            if (e.keyCode === 13 && value) {
              if (boardId) {
                dispatch(createColumn(e.currentTarget.value, boardId));
                e.currentTarget.value = "";
              }
            }
          }}
        />
      </ListsContent>
    </ListsWrapper>
  );
};

export default CreateColumn;
