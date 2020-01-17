import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import Lists from "components/Lists/Lists";
import CreateLists from "components/Lists/CreateLists";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers";
import { ListsType } from "store/reducers/lists";

const ListStyle = styled.section`
  height: 100%;
  overflow-y: hidden;
`;

const ListWrapper = styled.div`
  white-space: nowrap;
  user-select: none;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ListPage: React.FC = () => {
  const listsState = useSelector((state: RootState) => state.lists);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperRect, setWrapperRect] = React.useState<
    ClientRect & { scrollLeft: number }
  >({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    scrollLeft: 0
  });

  useEffect(() => {
    const handleScroll = (e: any) => {
      if (wrapperRef.current) {
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        const scrollLeft = wrapperRef.current.scrollLeft;
        setWrapperRect({ ...wrapperRect, scrollLeft });
      }
    };
    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [wrapperRef]);

  return (
    <ListStyle>
      <ListWrapper ref={wrapperRef}>
        {listsState.lists.map((list: ListsType, index: number) => (
          <Lists
            key={list.id}
            list={list}
            index={index}
            wrapperRect={wrapperRect}
          />
        ))}
        <CreateLists />
      </ListWrapper>
    </ListStyle>
  );
};

export default ListPage;
