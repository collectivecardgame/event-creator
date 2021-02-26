import { TextField } from "@material-ui/core";
import { useFetch } from "react-async";
import { StandardProps } from "../types";
import React, { useState } from "react";
import { SpacingSmall } from "../styles";
import { Alert } from "@material-ui/lab";

type Props = StandardProps & {
  name: string;
  parent: any;
  label?: string;
  multiline?: boolean;
  showAsCard?: boolean;
  showAsPosterImage?: boolean;
  number?: boolean;
  noEditing?: boolean;
};

const IMAGE_HEIGHT = 300;

export const imageUrlValidation: (a: string) => boolean = (a: string) => {
  return !!a.match(
    /https:\/\/files\.collective\.gg\/p\/cards\/[a-zA-Z0-9-]+\.png/
  );
};

type StupidProps = { fullUrl: string; setActive: any; label?: string };
const Fetcher = (props: StupidProps) => {
  const { fullUrl, setActive } = props;
  const { data, error }: { data: any; error: unknown } = useFetch(
    "https://server.collective.gg/api/card/" +
      fullUrl.match(
        /https:\/\/files\.collective\.gg\/p\/cards\/([a-zA-Z0-9-]+)-\w\.png/
      )![1],
    {
      headers: { accept: "application/json" },
    }
  );

  if (!data || error) {
    return <span>Loading...</span>;
  }

  const properties = data?.card?.Text?.Properties;
  const url =
    properties.find((x: any) => x?.Symbol?.Name === "PortraitUrl").Expression
      .Value ?? fullUrl;

  return (
    <ImageWithHooksFuckThis
      label={props.label}
      fullUrl={url}
      setActive={setActive}
    />
  );
};

const ImageWithHooksFuckThis = (props: StupidProps) => {
  const { setActive, fullUrl } = props;
  return (
    <>
      {props.label && (
        <div style={{ fontSize: 14, padding: SpacingSmall }}>{props.label}</div>
      )}
      <img
        onClick={() => {
          setActive(true);
        }}
        alt=""
        src={fullUrl}
        style={{
          minWidth: IMAGE_HEIGHT / 2,
          height: IMAGE_HEIGHT,
          maxWidth: IMAGE_HEIGHT * 3,
          cursor: "pointer",
        }}
      />
    </>
  );
};
const MyTextField = (props: Props) => {
  const {
    name,
    parent,
    handleChange,
    nodePath,
    showAsCard,
    noEditing,
    showAsPosterImage,
  } = props;
  const [active, setActive] = useState(false);
  if (
    (showAsCard || showAsPosterImage) &&
    !active &&
    typeof parent[name] === "string" &&
    imageUrlValidation(parent[name] as string)
  ) {
    let url = parent[name];
    if (!showAsCard) {
      return (
        <Fetcher label={props.label} fullUrl={url} setActive={setActive} />
      );
    }

    return (
      <ImageWithHooksFuckThis
        label={props.label}
        fullUrl={url}
        setActive={setActive}
      />
    );
  }

  const value = parent[name];
  const warning =
    value?.length > 299 ? (
      <div>
        If you want to show a long message, that's ok. But you should split it
        into chunks and show it bit by bit.
        <br />
        <br />
        The maximum here is 300 characters; we recommend splitting longer text
        between multiple decision nodes (with only one decision until the end)
      </div>
    ) : (
      ""
    );

  return (
    <>
      {warning && <Alert severity="warning">{warning}</Alert>}

      <TextField
        type={props.number ? "number" : ""}
        InputProps={
          props.number
            ? {
                inputProps: {
                  max: 100,
                  min: 1,
                },
              }
            : props.multiline
            ? { style: { paddingTop: 30 } }
            : {}
        }
        style={{ width: "100%" }}
        multiline={props.multiline}
        contentEditable={!noEditing}
        label={props?.label || ""}
        variant="filled"
        value={value}
        onBlur={() => setActive(false)}
        onChange={(e: any) => {
          if (noEditing) return;

          let targValue = e.target.value;
          if (typeof targValue === "string") {
            targValue = targValue.slice(0, 300);
          }
          handleChange(targValue, nodePath.concat([name]));
        }}
        name={name}
      />
    </>
  );
};
export default MyTextField;
