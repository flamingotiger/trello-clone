import React from "react";
import styled from "styled-components";
import Column from "components/Lists/Column";
import CreateColumn from "components/Lists/CreateColumn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/reducers";
import { DragDropContext } from "react-beautiful-dnd";
import {
  updateColumnTaskIndex,
  updataOtherColumnTaskIndex,
} from "store/reducers/column";

const Utils = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;

  h2 {
    font-size: 18px;
    font-weight: bold;
  }
`;
const BoardStyle = styled.section`
  height: 100%;
  position: relative;
`;

const BoardListWrapper = styled.div`
  white-space: nowrap;
  user-select: none;
  position: relative;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Board = () => {
  const dispatch = useDispatch();
  const [columnState, taskState] = useSelector((state: RootState) => [
    state.column,
    state.task,
  ]);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = columnState.columns[source.droppableId];
    const finish = columnState.columns[destination.droppableId];

    // 드래그 시작하는 부분과 끝나는 부분이 같은 칼럼일때
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      dispatch(updateColumnTaskIndex(newColumn));
      return;
    }

    // 다른 칼럼으로 이동할시
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    dispatch(updataOtherColumnTaskIndex(newStart, newFinish));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Utils>
        <h2>유틸즈</h2>
      </Utils>
      <BoardStyle>
        <BoardListWrapper>
          {columnState.columnOrder.map((columnId: string, index: number) => {
            const column = columnState.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId: string) => taskState.tasks[taskId]
            );
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                index={index}
              />
            );
          })}
          <CreateColumn />
        </BoardListWrapper>
      </BoardStyle>
    </DragDropContext>
  );
};

export default Board;
