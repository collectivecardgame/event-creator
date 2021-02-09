import React from "react";
import { Chance, ChanceNode, StandardProps } from "../types";
import UnknownNodeEditor from "./UnknownNodeEditor";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import { SpacingSmall } from "../styles";

type Props = StandardProps & {
  chance: Chance;
};

export default class ChanceEditor extends React.Component<Props, Props> {
  render() {
    const { chance, nodePath, handleChange } = this.props;
    const standardProps: StandardProps = { nodePath, handleChange };
    return (
      <>
        <MyPaper color="chance">
          <MyTextField
            number
            parent={chance}
            label="% Likelihood"
            name="chance"
            {...standardProps}
          />
        </MyPaper>
        <div style={{ height: SpacingSmall }}></div>
        <UnknownNodeEditor
          handleChange={handleChange}
          nodePath={nodePath.concat("next")}
          next={chance.next}
        />
      </>
    );
  }
}
