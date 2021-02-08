import React, { useState } from "react";
import Slide from "@material-ui/core/Slide";

import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useHideShowHook = (animate: boolean, children: any) => {
  const [show, setShow] = useState(true);
  const handleSetShow = (event: any, newValue: boolean) => setShow(newValue);
  const style = { width: 16, height: 16 };

  const content = animate ? (
    <Slide
      direction="up"
      in={show}
      mountOnEnter={animate}
      unmountOnExit={animate}
    >
      {children}
    </Slide>
  ) : show ? (
    children
  ) : (
    ""
  );
  return (
    <>
      <ToggleButtonGroup
        value={show}
        exclusive
        onChange={handleSetShow}
        aria-label="text alignment"
        style={{ marginBottom: 5 }}
      >
        <ToggleButton value={true} aria-label="left aligned">
          <VisibilityIcon style={style} />
        </ToggleButton>
        <ToggleButton value={false} aria-label="left aligned">
          <VisibilityOffIcon style={style} />
        </ToggleButton>
      </ToggleButtonGroup>
      {content}
    </>
  );
};

export default useHideShowHook;
