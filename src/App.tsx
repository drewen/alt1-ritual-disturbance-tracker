import React, { useState } from "react";
import Output from "./Output";
import Reader from "./Reader";
import Alt1Wrapper from "./Alt1Wrapper";
import About from "./About";
import { styled } from "styled-components";

const Toggle = styled.div`
  position: fixed;
  bottom: 5px;
  right: 5px;
  cursor: pointer;
  text-align: center;
`

export default () => {
  const [showAbout, setShowAbout] = useState(false);

  const contents = showAbout ? <About /> : (
    <>
      <Reader />
      <Output />
    </>
  );
  return (
    <React.StrictMode>
      <Alt1Wrapper>
        {contents}

        <a className="source" href="https://github.com/drewen/alt1-ritual-disturbance-tracker" target="_blank"><img src="./github-mark-white.png" width="15px" height="15px" /></a>
        <Toggle className="nisimgbutton" onClick={() => setShowAbout(!showAbout)}>
          {showAbout ? "x" : "?"}
        </Toggle>
      </Alt1Wrapper>
    </React.StrictMode>
  );
};