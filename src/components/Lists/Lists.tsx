import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import ListCard from './ListCard';
import { ListsType, updateListsTitle } from 'store/reducers/lists';

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

const Lists: React.FC<{ list: ListsType }> = ({ list }) => {
    const dispatch = useDispatch();
    return <ListsWrapper>
        <ListsContent>
            <ListHeader type="text" defaultValue={list.title}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    const value = e.currentTarget.value;
                    if (e.keyCode === 13 && value) {
                        dispatch(updateListsTitle(list.id, e.currentTarget.value))
                        e.currentTarget.blur();
                    }
                }} />
            <ListsStyle>
                {list.cards.map((card: any, i: number) => <ListCard key={i} />)}
            </ListsStyle>
        </ListsContent>
    </ListsWrapper>
}

export default Lists;