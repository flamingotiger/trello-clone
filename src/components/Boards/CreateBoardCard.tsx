import React from 'react';
import styled from 'styled-components';
import { BoardStyle } from './BoardStyle';

const CreateBoardCardStyle = styled(BoardStyle)`
    background-color: rgba(9,30,66,.04);
    color: #333;
    font-weight: normal;
    &:hover{
        background-color: rgba(9,30,66,.1);
    }
`
const CreateBoardCard = () => {
    return <CreateBoardCardStyle>Create new board</CreateBoardCardStyle>
}
export default CreateBoardCard;