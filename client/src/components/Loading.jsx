import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 5;
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  opacity: 0.6;
  position: absolute;
`

const Text = styled.p`
  color: black;
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 8px;
  opacity: 1 !important;
  z-index: 2;
`
const DotList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  opacity: 1 !important;
  z-index: 2;
`
const Wave = keyframes`
  0% {
    transform: translateY(0px);
  }
  50%,
  100% {
    transform: translateY(7px);
  }
`

const Dot = styled.div`
  border: 1px solid black;
  background-color: black;
  height: 3px;
  width: 3px;
  border-radius: 50%;
  animation: ${Wave} 0.5s infinite linear alternate;
`

const Loading = () => {
    return (
        <Container>
            <Wrapper></Wrapper>
            <Text className="text">LOADING</Text>
            <DotList>
                <Dot style={{ animationDelay: "0.125s" }}></Dot>
                <Dot style={{ animationDelay: "0.25s" }}></Dot>
                <Dot style={{ animationDelay: "0.375s" }}></Dot>
                <Dot style={{ animationDelay: "0.5s" }}></Dot>
            </DotList>
        </Container>
    )

};

export default Loading;
