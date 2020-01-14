import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Lists from 'components/Lists/Lists';
import CreateLists from 'components/Lists/CreateLists';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import { ListsType } from 'store/reducers/lists';

const ListStyle = styled.section`
    height: 100%;
    overflow-y: hidden;
    position: relative;
`

const ListWrapper = styled.div`
    white-space: nowrap;
    user-select: none;
    margin-bottom: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 8px;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid purple;
`

const ListPage: React.FC = () => {
    const listsState = useSelector((state: RootState) => state.lists);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [targetIndex, setTargetIndex] = useState<number>(0);

    useEffect(() => {
        const onMove = (event: MouseEvent) => {
            if (wrapperRef.current) {
                const { scrollLeft, scrollWidth } = wrapperRef.current;
                const { clientX } = event;
                const listWidth = scrollWidth / (listsState.lists.length + 1);
                const target = Math.floor((clientX + scrollLeft) / listWidth);
                setTargetIndex(target);
            }
        }
        document.addEventListener('mousemove', onMove);
        return () => {
            document.removeEventListener('mousemove', onMove);
        }
    }, [wrapperRef, listsState]);

    return (<ListStyle>
        <ListWrapper ref={wrapperRef}>
            {listsState.lists.map((list: ListsType, index: number) =>
                <Lists key={list.id} list={list} index={index} targetIndex={targetIndex} />
            )}
            <CreateLists />
        </ListWrapper>
    </ListStyle>)
}

export default ListPage;