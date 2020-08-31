import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { RootState } from "store/reducers";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { updateTask } from "store/reducers/task";

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
  height: 90%;
  margin: 10px auto;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
`;
const Title = styled.textarea`
  height: ${(props: { textareaHeight: string }) => props.textareaHeight};
  width: 100%;
  font-size: 28px;
  min-height: 28px;
  border: none;
  line-height: 28px;
  resize: none;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0);
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  overflow: hidden;
  &:focus {
    background-color: #fff;
  }
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
  margin-top: 10px;
`;
const CloseBtn = styled.button`
  ${Button};
  background-color: #e61e3f;
  &:hover {
    background-color: #ff3d5d;
  }
`;
interface DetailPopupProps {
  taskId: string;
}
const DetailPopup: React.FC<DetailPopupProps> = ({ taskId }) => {
  const dispatch = useDispatch();
  const taskState = useSelector((state: RootState) => state.task);
  const task = taskState.tasks[taskId];
  const [value, setValue] = useState(task.taskName);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const location = useLocation();
  const history = useHistory();
  const [, board, boardId] = location.pathname.split("/");

  useEffect(() => {
    resizeHeader();
  }, []);

  const resizeHeader = () => {
    if (textareaRef && textareaRef.current) {
      setTextareaHeight("auto");
      setTextareaHeight(textareaRef.current.scrollHeight + "px");
    }
  };
  if (!task) return null;
  return (
    <Dim>
      <Container>
        <Title
          value={value}
          ref={textareaRef}
          onKeyDown={resizeHeader}
          onKeyUp={resizeHeader}
          textareaHeight={textareaHeight}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
          onBlur={() => dispatch(updateTask(taskId, value))}
        />
        <CloseBtn onClick={() => history.replace(`/${board}/${boardId}`)}>
          CLOSE
        </CloseBtn>
      </Container>
    </Dim>
  );
};
export default DetailPopup;
