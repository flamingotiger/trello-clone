import React from 'react';
import styled from 'styled-components';
import CreateBoardCard from 'components/Boards/CreateBoardCard';
import BoardCard from 'components/Boards/BoardCard';
import { useSelector } from 'react-redux';
import { BoardType } from 'store/reducers/board';
import { RootState } from 'store/reducers';

const HomeWrap = styled.section`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const Home = () => {
    const boardState = useSelector((state: RootState) => state.board);
    return <HomeWrap>
        {boardState.boards.map((board: BoardType) => <BoardCard key={board.id} board={board}/>)}
        <CreateBoardCard />
    </HomeWrap>
}

export default Home;