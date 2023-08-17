import React, { useEffect, useState } from "react";

type WrapperProps = {
  children: React.ReactNode
}
export default (props: WrapperProps) => {
  const [alt1Exists, setAlt1Exists] = useState(false);

  useEffect(() => {
    if (window.alt1) {
      window.alt1.identifyAppUrl("./appconfig.json");
      setAlt1Exists(true);
    }
  });

  if (alt1Exists) {
    return (
      <>
        {props.children}
      </>
    );
  } else {
    const appUrl = `alt1://addapp/${new URL("./appconfig.json", document.location.href).href}`;

    return (
      <div>
        Alt1 not detected, click <a href={appUrl}>here</a> to add this app to Alt1
      </div>
    );
  }

};
