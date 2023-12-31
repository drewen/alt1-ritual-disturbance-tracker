import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: calc(100% - 10px);;
  height: calc(100% - 10px);;
  z-index: 100;
  background-image: url(https://runeapps.org/nis/alt1-currentskin/background.png);
  top: 0;
  left: 0;
  position: fixed;
  padding: 5px;
`

export default () => {
  return (
    <Wrapper>
      <p>This Alt1 App is made to help track Ritual Disturbances (and some other things) at various ritual tiers and soul attraction levels.</p>
      <p>To upload data, export, open in notepad, and follow instructions <a href="https://forms.gle/3UaZNRtHrcV9xZ1VA" target="_blank">here</a></p>
      <p>
        Features in progress:
      </p>
      <ul>
        <li>Read attraction/ritual tier from the game screen</li>
        <li>Continually improve reading/chat detection</li>
        <li>Add sounds so you don't also have to run the afk warden?</li>
      </ul>
    </Wrapper>
  );
};
