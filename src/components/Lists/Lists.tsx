import React, { useEffect } from 'react';
import styled from 'styled-components';
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

const Lists: React.FC<{ list: ListsType, index: number }> = ({ list, index }) => {
    const dispatch = useDispatch();
    const cards = useSelector((state: RootState) =>
        state.card.cards.filter((card: CardType) => card.listsId === list.id)
    );
    const divEl = React.useRef<HTMLDivElement>(null);
    const [[left, top], setCoords] = React.useState<number[]>([0, 0]);
    const [moving, setMoving] = React.useState(false);
    const [rect, setRect] = React.useState<ClientRect>({
        bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0
    });
    const [targetIndex, setTargetIndex] = React.useState<number | null>(null);

    useEffect(() => {
        if (divEl && divEl.current) {
            const rect = divEl.current.getBoundingClientRect();
            setRect(rect);
        }
    }, [divEl]);

    useEffect(() => {
        if (moving && targetIndex !== null) {
            dispatch(updateListsIndex(index, targetIndex));
        }
    }, [dispatch, index, targetIndex, moving]);

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            if (moving) {
                if (divEl && divEl.current) {
                    const rect = divEl.current.getBoundingClientRect();
                    setCoords([event.clientX - rect.left, event.clientY - rect.top]);
                }
                const moveIndex = Math.floor((event.clientX - event.clientX % rect.width) / rect.width);
                setTargetIndex(moveIndex);
            }
        };
        const onMouseUp = () => {
            setMoving(false);
            setCoords(prevState => [prevState[0] - (prevState[0] % rect.width), 0]);
        }
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, [moving, rect])

    return <ListsWrapper ref={divEl} style={{ border: '1px solid green' }}>
        <div style={{
            border: '1px solid blue',
            height: '100%',
            width: '272px',
            top: `${top}px`,
            left: `${left}px`,
            cursor: moving ? 'grabbing' : 'pointer',
            zIndex: moving ? 1000 : 1,
            position: 'relative'
        }}>
            <ListsContent style={{
                border: '1px solid red',
                transform: moving ? 'rotate(10deg)' : 'rotate(0)',
            }} onMouseDown={(e: React.MouseEvent) => {
                e.stopPropagation();
                if (e.button !== 0) return;
                setMoving(true);
            }}>
                <ListHeaderWrapper>
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
        </div>
    </ListsWrapper>
}

export default Lists;