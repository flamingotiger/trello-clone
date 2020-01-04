import React from 'react';
import styled from 'styled-components';
import CreateBoardCard from 'components/Boards/CreateBoardCard';
import BoardCard from 'components/Boards/BoardCard';
import { useSelector } from 'react-redux';
import { BoardType } from 'store/reducers/board';
import { RootState } from 'store/reducers';

const BoardWrap = styled.section`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const BoardPage:React.FC = () => {
    const boardState = useSelector((state: RootState) => state.board);
    return <BoardWrap>
        {boardState.boards.map((board: BoardType) => <BoardCard key={board.id} board={board}/>)}
        <CreateBoardCard />
    </BoardWrap>
}

export default BoardPage;