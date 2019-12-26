import styled from "styled-components";

export const BoardStyle = styled.div`
    width: calc(25% - 20px);
    height: 100px;
    margin: 10px;
    background-color: #026aa7;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    transition: 0.2s;
    &:hover{
        transform: scale(1.05);
    }
`