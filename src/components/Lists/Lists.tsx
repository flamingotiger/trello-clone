import React, { useEffect, CSSProperties, useCallback, useState } from "react";
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
  white-space: normal;
  width: 272px;
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
  height: 87px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  width: 272px;
  position: absolute;
`;

interface ListsProps {
  list: ListsType;
  index: number;
  wrapperRect: ClientRect;
  scrollLeft: number;
}

const Lists: React.FC<ListsProps> = ({
  list,
  index,
  wrapperRect,
  scrollLeft
}) => {
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) =>
    state.card.cards.filter((card: CardType) => card.listsId === list.id)
  );
  const divEl = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [[x, y], setCoords] = useState<[number, number]>([0, 0]);
  const [rect, setRect] = useState<ClientRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0
  });
  const [targetIndex, setTargetIndex] = useState<number>();

  const getTargetIndex = (clientX: number) => {
    const margin = (rect.left % rect.width) / (index * 2 + 1);
    const widthAndMargin = 2 * margin + rect.width;
    let targetIndex = index;
    if (clientX + scrollLeft > index * widthAndMargin + widthAndMargin) {
      targetIndex = index + 1;
    } else if (clientX + scrollLeft < index * widthAndMargin) {
      targetIndex = index - 1;
    }
    setTargetIndex(targetIndex);
  };

  useEffect(() => {
    const dragging = (e: MouseEvent) => {
      if (isDragging) {
        setCoords(([x, y]) => {
          getTargetIndex(e.clientX);
          return [x + e.movementX, y + e.movementY];
        });
      }
    };
    const dropping = () => {
      setIsDragging(false);
      setCoords([0, 0]);
    };
    window.addEventListener("mousemove", dragging);
    window.addEventListener("mouseup", dropping);
    return () => {
      window.removeEventListener("mousemove", dragging);
      window.removeEventListener("mouseup", dropping);
    };
  }, [isDragging, wrapperRect]);

  useEffect(() => {
    if (divEl.current) {
      const rect = divEl.current.getBoundingClientRect();
      setRect(rect);
    }
  }, [divEl]);

  const defaultPosition = rect.left - scrollLeft;

  const getDraggingStyle = (): CSSProperties => {
    const style: CSSProperties = {
      position: isDragging ? "fixed" : "relative",
      left: isDragging ? `${defaultPosition}px` : 0,
      transform: `translate(${x}px,${y}px)`,
      cursor: isDragging ? "grabbing" : "pointer",
      zIndex: isDragging ? 1000 : 10,
      willChange: isDragging ? "transform" : "auto"
    };
    return style;
  };

  return (
    <ListsWrapper ref={divEl}>
      {isDragging && (
        <ListsPlaceHolder
          style={{ position: "absolute", left: `${defaultPosition}px` }}
        />
      )}
      <ListsContent style={getDraggingStyle()}>
        <ListHeaderWrapper
          onMouseDown={(e: React.MouseEvent) => {
            e.stopPropagation();
            if (e.button !== 0) return;
            setIsDragging(true);
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
