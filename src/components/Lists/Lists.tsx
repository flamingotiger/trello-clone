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
    const [size, setSize] = React.useState({ width: 0, height: 0 });
    const [targetIndex, setTargetIndex] = React.useState<number | null>(null);

    useEffect(() => {
        if (divEl && divEl.current) {
            const { width, height } = divEl.current.getBoundingClientRect();
            setSize({ width, height })
        }
    }, [divEl]);

    useEffect(() => {
        if (moving && index !== targetIndex && targetIndex !== null) {
            dispatch(updateListsIndex(index, targetIndex));
            setCoords([0,0])
            console.log(left)
        }
    }, [dispatch, index, targetIndex, moving]);

    return <ListsWrapper ref={divEl} style={{
        position: 'relative',
        top: `${top}px`,
        left: `${left}px`,
        cursor: moving ? 'grabbing' : 'pointer',
        zIndex: moving ? 1000 : 1,
    }}>
        <ListsContent>
            <ListHeaderWrapper
                onMouseDown={(e: React.MouseEvent) => {
                    // 이벤트 전파 막기
                    e.stopPropagation();
                    // 보조 버튼(오른쪽 버튼)
                    // e.button === 0 => 마우스 왼쪽 클릭
                    if (e.button !== 0) return;
                    const offsetX = e.clientX;
                    const offsetY = e.clientY;
                    const onMouseMove = (event: MouseEvent) => {
                        const dx = event.clientX - offsetX;
                        const dy = event.clientY - offsetY;
                        setCoords([left + dx, top + dy]);
                        if (Math.abs(dx) > 0 || Math.abs(dy) > 0) setMoving(true);
                        const moveIndex = Math.floor((event.clientX - event.clientX % size.width) / size.width);
                        if (moveIndex !== index) {
                            setTargetIndex(moveIndex);
                        }
                    };
                    const onMouseUp = () => {
                        setMoving(false);
                        setCoords(prevState => [prevState[0] - (prevState[0] % size.width), 0]);
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                    };
                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
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
            </ListsStyle>
            <CreateCard listId={list.id} />
        </ListsContent>
    </ListsWrapper>
}

export default Lists;