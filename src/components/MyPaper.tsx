import React from "react";
import { Paper } from "@material-ui/core";
import {
  ChanceColor,
  DecisionColor,
  DefaultColor,
  JsonColor,
  JsonSuccessColor,
  ResultColor,
} from "../styles";

export type Color =
  | "decision"
  | "chance"
  | "result"
  | "json"
  | "jsonsuccess"
  | undefined
  | "";

type Props = {
  children: any;
  color?: Color;
};

const MyTextField = (props: Props) => {
  const { children, color } = props;
  let bgColor;
  switch (color) {
    case "decision":
      bgColor = DecisionColor;
      break;
    case "chance":
      bgColor = ChanceColor;
      break;
    case "result":
      bgColor = ResultColor;
      break;
    case "json":
      bgColor = JsonColor;
      break;
    case "jsonsuccess":
      bgColor = JsonSuccessColor;
      break;
    default:
      bgColor = DefaultColor;
      break;
  }
  return (
    <Paper style={{ padding: 10, backgroundColor: bgColor, minWidth: 120 }}>
      {children}
    </Paper>
  );
};
export default MyTextField;
