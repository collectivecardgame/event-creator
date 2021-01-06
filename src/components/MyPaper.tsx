import React from "react";
import { Paper } from "@material-ui/core";

export type Color = "decision" | "chance" | "result" | "json";

type Props = {
  children: any;
  color?: Color;
};
const MyTextField = (props: Props) => {
  const { children, color } = props;
  let bgColor = "#eee"; // red
  switch (color) {
    case "decision":
      bgColor = "#3A606E";
      break;
    case "chance":
      bgColor = "#607b7d";
      break;
    case "result":
      bgColor = "#828e82";
      break;
    case "json":
      bgColor = "#5e0b15";
      break;
    default:
      bgColor = "#333";
      break;
  }
  return (
    <Paper style={{ padding: 10, backgroundColor: bgColor }}>{children}</Paper>
  );
};
export default MyTextField;
