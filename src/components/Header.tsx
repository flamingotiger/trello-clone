import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const HeaderStyle = styled.header`
    height: 60px;
    width: 100%;
    background-color: #026aa7;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LinkStyle = styled(Link)`
    color: rgba(255,255,255,0.7);
    font-weight: bold;
    text-decoration: none;
    font-size: 24px;
    &:hover{
        color: rgba(255,255,255);
    }
    span{
        margin-left:10px;
    }
`
const Header = () => {
    return <HeaderStyle>
        <LinkStyle to="/">
            <FontAwesomeIcon icon={faTrello} size="lg" />
            <span>TRELLO CLONE</span>
        </LinkStyle>
    </HeaderStyle>
}
export default Header;