import React from "react";
import Output from "./Output";
import Settings from "./Settings";
import Reader from "./Reader";
import Alt1Wrapper from "./Alt1Wrapper";

export default () => {
  return (
    <React.StrictMode>
      <a className="source" href="https://github.com/drewen/alt1-ritual-disturbance-tracker"><img src="./github-mark-white.png" width="25px" height="25px" /></a>
      <Alt1Wrapper>
        <Settings />
        <Reader />
        <Output />
      </Alt1Wrapper>
    </React.StrictMode>
  );
};