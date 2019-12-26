import React from 'react';
import styled from 'styled-components';
import CreateBoardCard from 'components/Boards/CreateBoardCard';
import BoardCard from 'components/Boards/BoardCard';

const HomeWrap = styled.section`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`

const Home = () => {
    return <HomeWrap>
        {['', ''].map((board, i) => <BoardCard key={i} />)}
        <CreateBoardCard />
    </HomeWrap>
}

export default Home;