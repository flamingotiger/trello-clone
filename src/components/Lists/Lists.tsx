import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from './ListCard';
import { ListsType, updateListsTitle } from 'store/reducers/lists';
import CreateCard from './CreateCard';
import { RootState } from 'store/reducers';
import { CardType } from 'store/reducers/card';

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
    const cards = useSelector((state: RootState) =>
        state.card.cards.filter((card: CardType) => card.listsId === list.id)
    );
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
                {cards.map((card: CardType, i: number) => <ListCard key={i} card={card} />)}
            </ListsStyle>
            <CreateCard listId={list.id} />
        </ListsContent>
    </ListsWrapper>
}

export default Lists;