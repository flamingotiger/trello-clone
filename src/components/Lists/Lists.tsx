import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ListCard from "./ListCard";
import {
  ListsType,
  updateListsTitle,
  updateListsIndex
} from "store/reducers/lists";
import CreateCard from "./CreateCard";
import { RootState } from "store/reducers";
import { CardType } from "store/reducers/card";

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
  width: 272px;
  ${(props: { isMoveSource: boolean }) => {
    if (props.isMoveSource) {
      return css`
        cursor: grabbing;
        z-index: 1000;
        will-change: transform;
      `;
    } else {
      return css`
        cursor: pointer;
        z-index: 10;
        will-change: auto;
      `;
    }
  }}
`;

const ListsStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
`;

const ListHeader = styled.input`
  background-color: rgba(255, 255, 255, 0);
  border: 0 none;
  user-select: none;
  font-size: 14px;
  line-height: 18px;
  height: 18px;
  padding-left: 10px;
  font-weight: bold;
  outline: none;
`;

const ListHeaderWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

const ListsPlaceHolder = styled.div`
  height: 100px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 272px;
  position: absolute;
`;

interface ListsProps {
  list: ListsType;
  index: number;
  targetIndex: number;
  CoordList: [number, number];
  moveIndex: number | undefined;
  moving: boolean;
  setMoving: () => void;
  setMoveIndex: (m: number) => void;
  resetListPosition: () => void;
}

const Lists: React.FC<ListsProps> = ({
  list,
  index,
  targetIndex,
  CoordList,
  moveIndex,
  setMoveIndex,
  resetListPosition,
  setMoving,
  moving
}) => {
  const isMoveSource = index === moveIndex;
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) =>
    state.card.cards.filter((card: CardType) => card.listsId === list.id)
  );

  useEffect(() => {
    if (isMoveSource && targetIndex !== moveIndex) {
      if (moveIndex !== undefined) {
        dispatch(updateListsIndex(moveIndex, targetIndex));
        resetListPosition();
        setMoveIndex(targetIndex);
      }
    }
  }, [
    dispatch,
    index,
    targetIndex,
    isMoveSource,
    moveIndex,
    resetListPosition,
    setMoveIndex
  ]);

  return (
    <ListsWrapper>
      {isMoveSource && <ListsPlaceHolder />}
      <ListsContent
        isMoveSource={isMoveSource}
        style={
          isMoveSource && moving
            ? {
                position: "absolute",
                left:`${Math.abs(CoordList[0]) > 0 ? `${CoordList[0]}px` : 'auto'}`,
                top:`${Math.abs(CoordList[1]) > 0 ? `${CoordList[1]}px` : 'auto'}`
              }
            : {}
        }
      >
        <ListHeaderWrapper
          onMouseDown={(e: React.MouseEvent) => {
            e.stopPropagation();
            if (e.button !== 0) return;
            setMoveIndex(index);
            setMoving();
          }}
        >
          <ListHeader
            type="text"
            defaultValue={list.title}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              const value = e.currentTarget.value;
              if (e.keyCode === 13 && value) {
                dispatch(updateListsTitle(list.id, e.currentTarget.value));
                e.currentTarget.blur();
              }
            }}
          />
        </ListHeaderWrapper>
        <ListsStyle>
          {cards.map((card: CardType, i: number) => (
            <ListCard key={i} card={card} />
          ))}
          <CreateCard listId={list.id} />
        </ListsStyle>
      </ListsContent>
    </ListsWrapper>
  );
};

export default Lists;
