import React from 'react';
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
    const listsState = useSelector((state:RootState) => state.lists);
    return (<BoardStyle>
        <BoardListWrapper>
            {listsState.lists.map((list:ListsType) => <Lists key={list.id} list={list}/>)}
            <CreateLists />
        </BoardListWrapper>
    </BoardStyle>)
}

export default Board;