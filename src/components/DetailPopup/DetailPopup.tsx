import React from "react";
import styled from "styled-components";
import { RootState } from "store/reducers";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

const Dim = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;
const Container = styled.div`
  background-color: #f4f5f7;
  max-width: 800px;
  margin: 100px auto;
  border-radius: 10px;
  padding: 20px;
`;
const Title = styled.textarea`
  width: 100%;
  font-size: 28px;
  height: 28px;
  border: none;
  line-height: 28px;
  resize: none;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  &:focus {
    background-color: #fff;
  }
`;
const CloseBtn = styled.button`
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: 1px solid black;
  color: black;
  &:hover {
    background-color: #026aa7;
    border: none;
    color: white;
    cursor: pointer;
  }
`;
interface DetailPopupProps {
  taskId: string;
}
const DetailPopup: React.FC<DetailPopupProps> = ({ taskId }) => {
  const taskState = useSelector((state: RootState) => state.task);
  const task = taskState.tasks[taskId];
  const location = useLocation();
  const history = useHistory();
  const [, board, boardId] = location.pathname.split("/");
  if (!task) return null;
  return (
    <Dim>
      <Container>
        <Title value={task.taskName}/>
        <CloseBtn onClick={() => history.replace(`/${board}/${boardId}`)}>
          CLOSE
        </CloseBtn>
      </Container>
    </Dim>
  );
};
export default DetailPopup;
