import React, { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: black;
  top: 0;
  left: 0;
  position: fixed;
`

const Toggle = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  text-align: right;
  width: 25px;
  height: 25px;
`

export default () => {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <Wrapper>
        <p>This Alt1 App is made to help track Ritual Disturbances (and some other things) at various ritual tiers and soul attraction levels. Check out source code <a href="https://github.com/drewen/alt1-ritual-disturbance-tracker" target="_blank">here</a></p>
        <p>To upload data, click <a href="https://forms.gle/3UaZNRtHrcV9xZ1VA" target="_blank">here</a></p>
        <p>
          Features in progress:
          <ul>
            <li>UI Cleanup - it's rough around the edges</li>
            <li>Read attraction/ritual tier from the game screen</li>
            <li>Continually improve reading/chat detection</li>
            <li>Add sounds so you don't also have to run the afk warden?</li>
          </ul>
        </p>
        <Toggle onClick={() => setActive(false)}>
          x
        </Toggle>
      </Wrapper>
    );
  } else {
    return (
      <Toggle onClick={() => setActive(true)}>
        i
      </Toggle>
    );
  }
};
