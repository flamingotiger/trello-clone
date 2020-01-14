import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from './ListCard';
import { ListsType, updateListsTitle, updateListsIndex } from 'store/reducers/lists';
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
    position: relative;
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
    width: 272px;
    ${(props: { moving: boolean }) => {
        if (props.moving) {
            return css`
            cursor: grabbing;
            z-index: 1000;
            will-change: transform;
            `
        } else {
            return css`
            cursor: pointer;
            z-index: 10;
            will-change: auto;
            `
        }
    }}
`

const ListsStyle = styled.ul`
   list-style: none;
   margin: 0;
   padding: 0;
   overflow-y:auto;
`

const ListHeader = styled.input`
    background-color: rgba(255,255,255,0);
    border: 0 none;
    user-select: none;
    font-size: 14px;
    line-height: 18px;
    height: 18px;
    padding-left: 10px;
    font-weight: bold;
    outline: none;
`

const ListHeaderWrapper = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
`

const ListsPlaceHolder = styled.div`
    position: absolute;
    left:0;
    top:0;
    height: 100px;
    background: rgba(0,0,0,0.2);
    border-radius: 3px;
    width: 100%;
`

interface ListsProps {
    list: ListsType;
    index: number;
    targetIndex: number;
    leftList: number;
    topList: number;
    moveIndex: number | undefined;
    setMoveIndex: (m: number) => void;
    resetListPosition: () => void;
}

const Lists: React.FC<ListsProps> = ({ list, index, targetIndex, leftList, topList, moveIndex, setMoveIndex, resetListPosition }) => {
    const moving = index === moveIndex;
    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) =>
        state.card.cards.filter((card: CardType) => card.listsId === list.id)
    );
    
    useEffect(() => {
        if (moving && targetIndex !== moveIndex) {
            if (moveIndex !== undefined) {
                dispatch(updateListsIndex(moveIndex, targetIndex));
                resetListPosition();
                setMoveIndex(targetIndex);
            }
        }
    }, [dispatch, index, targetIndex, moving, moveIndex, resetListPosition, setMoveIndex]);

    return <ListsWrapper>
        {moving && <ListsPlaceHolder />}
        <ListsContent moving={moving}
            // style={moving ? { position: 'fixed', transform: `translateX(${leftList}px) translateY(${topList}px) rotate(10deg)` } : {}}
            style={moving ? { position: 'fixed', left: `${leftList}px`, top: `${topList}px` } : {}}
        >
            <ListHeaderWrapper onMouseDown={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (e.button !== 0) return;
                setMoveIndex(index);
            }}>
                <ListHeader type="text" defaultValue={list.title}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        const value = e.currentTarget.value;
                        if (e.keyCode === 13 && value) {
                            dispatch(updateListsTitle(list.id, e.currentTarget.value))
                            e.currentTarget.blur();
                        }
                    }} />
            </ListHeaderWrapper>
            <ListsStyle>
                {cards.map((card: CardType, i: number) => <ListCard key={i} card={card} />)}
                <CreateCard listId={list.id} />
            </ListsStyle>
        </ListsContent>
    </ListsWrapper>
}

export default Lists;