import React, { useEffect } from 'react';
import styled from 'styled-components';
import Lists from 'components/Lists/Lists';
import CreateLists from 'components/Lists/CreateLists';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { ListsType } from 'store/reducers/lists';

const BoardStyle = styled.section`
    height: 100%;
    overflow-y: auto;
    position: relative;
`

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
`

const Board = () => {
    const listsState = useSelector((state: RootState) => state.lists);
    return (<BoardStyle>
        <BoardListWrapper>
            {listsState.lists.map((list: ListsType, index: number) =>
                <Lists key={list.id} list={list} index={index} />)}
            <CreateLists />
        </BoardListWrapper>
    </BoardStyle>)
}

export default Board;

const DNDcontroller = ([prevRect, nextRect]: (ClientRect | null)[], currentRect: ClientRect): number => {
    let overlap = 0;
    if (prevRect) {
        if (prevRect.right < currentRect.left || prevRect.bottom < currentRect.top) {
            overlap = -1;
        }
    }
    if (nextRect) {
        if (currentRect.right > nextRect.left || currentRect.bottom > nextRect.top) {
            overlap = 1
        }
    }
    return overlap;
}