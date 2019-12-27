import React from 'react';
import styled from 'styled-components';
import ListCard from './ListCard';

const ListsWrapper = styled.div`
    width: 272px;
    margin: 0 4px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
`

const ListsContent = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
`

const ListsStyle = styled.ul`
   list-style: none;
   margin: 0;
   padding: 0;
`

const ListHeader = styled.input`
    background-color: rgba(255,255,255,0);
    border: 0 none;
    user-select: none;
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    padding-left: 10px;
    font-weight: bold;
`

const Lists: React.FC = () => {
    return <ListsWrapper>
        <ListsContent>
            <ListHeader type="text" value="리스트 목록" disabled />
            <ListsStyle>
                {[1, 2, 3, 4].map((card, i) => <ListCard key={i} />)}
            </ListsStyle>
        </ListsContent>
    </ListsWrapper>
}

export default Lists;