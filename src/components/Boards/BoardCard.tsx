import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BoardStyle } from './BoardStyle';
import { BoardType } from 'store/reducers/board';

const LinkStyle = styled(Link)`
    text-decoration: none;
    color: rgba(255,255,255,0.9);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const BoardCard: React.FC<{ board: BoardType }> = ({ board }) => {
    return <BoardStyle><LinkStyle to={`/board/${board.id}`}>{board.title}</LinkStyle></BoardStyle>
}
export default BoardCard;