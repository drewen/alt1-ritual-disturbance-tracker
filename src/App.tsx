import React from "react";
import Output from "./Output";
import Settings from "./Settings";
import Reader from "./Reader";
import Alt1Wrapper from "./Alt1Wrapper";
import About from "./About";

export default () => {
  return (
    <React.StrictMode>
      
      <Alt1Wrapper>
        <Settings />
        <Reader />
        <Output />
      </Alt1Wrapper>
      <About />
    </React.StrictMode>
  );
};