import { TextField } from "@material-ui/core";
import { useFetch } from "react-async";
import { StandardProps } from "../types";
import React, { useState } from "react";
import { SpacingSmall } from "../styles";

type Props = StandardProps & {
  name: string;
  parent: any;
  label?: string;
  multiline?: boolean;
  showAsCard?: boolean;
  showAsPosterImage?: boolean;
  number?: boolean;
};

const IMAGE_HEIGHT = 300;

const validation: (a: string) => boolean = (a: string) => {
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

  console.log(data);

  const properties = data?.card?.Text?.Properties;
  const url =
    properties.find((x: any) => x?.Symbol?.Name === "PortraitUrl").Expression
      .Value ?? fullUrl;
  console.log(url);

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
    showAsPosterImage,
  } = props;
  const [active, setActive] = useState(false);
  if (
    (showAsCard || showAsPosterImage) &&
    !active &&
    typeof parent[name] === "string" &&
    validation(parent[name] as string)
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

  return (
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
          : {}
      }
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
