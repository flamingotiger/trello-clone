import React from 'react';
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
    position: relative;
    margin-bottom: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 8px;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`

const ListPage: React.FC = () => {
    const listsState = useSelector((state: RootState) => state.lists);
    return (<ListStyle>
        <ListWrapper>
            {listsState.lists.map((list: ListsType, index: number) =>
                <Lists key={list.id} list={list} index={index} />)}
            <CreateLists />
        </ListWrapper>
    </ListStyle>)
}

export default ListPage;