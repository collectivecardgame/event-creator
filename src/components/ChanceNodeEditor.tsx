import React from "react";
import { ChanceNode, StandardProps } from "../types";
import MyPaper from "./MyPaper";
import { NodeHeader } from "./MyText";

type Props = StandardProps & { node: ChanceNode };

export default class ChanceNodeEditor extends React.Component<Props, Props> {
  render() {
    return (
      <MyPaper color="chance">
        <NodeHeader>Chance Node</NodeHeader>
        Chance node editor
      </MyPaper>
    );
  }
}
