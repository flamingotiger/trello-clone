import React from 'react';
import styled from 'styled-components';
import Lists from 'components/Lists/Lists';

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
    return (<BoardStyle>
        <BoardListWrapper>
            {[0, 1, 2, 3, 4, 5, 6].map((list, i) => <Lists key={i} />)}
        </BoardListWrapper>
    </BoardStyle>)
}

export default Board;