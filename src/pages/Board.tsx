import React from "react";
import styled from "styled-components";
import Column from "components/Lists/Column";
import CreateColumn from "components/Lists/CreateColumn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/reducers";
import { DragDropContext } from "react-beautiful-dnd";
import { updateColumnTaskIndex } from "store/reducers/column";

const BoardStyle = styled.section`
  height: 100%;
  overflow-y: auto;
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
    const column = columnState.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);
    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    dispatch(updateColumnTaskIndex(newColumn));
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
