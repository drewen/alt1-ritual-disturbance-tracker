import React, { useState, useEffect } from "react";
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

const Textarea = styled.textarea`
  width: 250px;
  height: 250px;
`

export default ({ disturbances, closeExport }: { disturbances: any, closeExport: () => void }) => {
  const [pretty, setPretty] = useState(false);
  const [exportUrl, setExportUrl] = useState("");
  const [exportFilename, setExportFilename] = useState("");

  const display = pretty ? JSON.stringify(disturbances, null, 2) : JSON.stringify(disturbances)

  useEffect(() => {
    const filedata = new Blob([JSON.stringify(disturbances)], { type: "application/json" });
    setExportUrl(URL.createObjectURL(filedata));
    const currentTimestamp = (new Date()).toISOString();
    setExportFilename(`disturbances-${currentTimestamp}.json`)
  }, [disturbances])

  return (
    <Wrapper>
      <Textarea value={display} disabled />
      <button className="nisbutton nissmallbutton" onClick={() => setPretty(!pretty)}>{pretty ? "Ugly" : "Pretty" }</button>
      <a href={exportUrl} download={exportFilename}>
        <button className="nisbutton nissmallbutton">Download</button>
      </a>
      <button className="nisbutton nissmallbutton" onClick={closeExport}>Back</button>
    </Wrapper>
  );
};
