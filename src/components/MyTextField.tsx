import { TextField } from "@material-ui/core";
import { StandardProps } from "../types";
import React, { useState } from "react";

type Props = StandardProps & {
  name: string;
  parent: any;
  label?: string;
  multiline?: boolean;
  showAsCard?: boolean;
  showAsPosterImage?: boolean;
};

const validation: (a: string) => boolean = (a: string) => {
  return !!a.match(
    /https:\/\/files\.collective\.gg\/p\/cards\/[a-zA-Z0-9-]+\.png/
  );
};
const MyTextField = (props: Props) => {
  const {
    name,
    parent,
    handleChange,
    nodePath,
    showAsCard,
    showAsPosterImage,
  } = props;
  const [active, setActive] = useState(false);
  if (
    showAsCard &&
    !active &&
    typeof parent[name] === "string" &&
    validation(parent[name] as string)
  ) {
    return (
      <>
        <div style={{ paddingTop: 5 }}>Card reward</div>
        <img
          onClick={() => {
            setActive(true);
          }}
          src={parent[name]}
          style={{ maxWidth: 200, cursor: "pointer" }}
        />
      </>
    );
  }
  return (
    <TextField
      style={{ width: "100%" }}
      multiline={props.multiline}
      label={props?.label || ""}
      variant="filled"
      value={parent[name]}
      onBlur={() => setActive(false)}
      onChange={(e: any) => {
        handleChange(e.target.value, nodePath.concat([name]));
      }}
      name={name}
    />
  );
};
export default MyTextField;
