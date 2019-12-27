import React from 'react';
import styled from 'styled-components';
import { BoardStyle } from './BoardStyle';
import { useDispatch } from 'react-redux';
import { createBoard } from 'store/reducers/board';

const CreateBoardCardStyle = styled(BoardStyle)`
    background-color: rgba(9,30,66,.04);
    color: #333;
    font-weight: normal;
    &:hover{
        background-color: rgba(9,30,66,.1);
    }
`
const Input = styled.input`
    background-color: rgba(0,0,0,0);
    border: none;
    font-size: 14px;
    outline: none;
`

const CreateBoardCard: React.FC = () => {
    const dispatch = useDispatch();
    return <CreateBoardCardStyle>
        <Input placeholder="Create new board" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === 13) {
                dispatch(createBoard(e.currentTarget.value))
                e.currentTarget.value = '';
            }
        }} />
    </CreateBoardCardStyle>
}
export default CreateBoardCard;