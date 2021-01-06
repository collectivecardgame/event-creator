import React from "react";
import { Decision, DecisionNode, StandardProps } from "../types";
import UnknownNodeEditor from "./UnknownNodeEditor";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import { SpacingSmall } from "../styles";

type Props = StandardProps & {
  decision: Decision;
};

export default class DecisionEditor extends React.Component<Props, Props> {
  render() {
    const { decision, nodePath, handleChange } = this.props;
    const standardProps: StandardProps = { nodePath, handleChange };
    return (
      <>
        <MyPaper color="decision">
          <MyTextField
            parent={decision}
            label="Decision text"
            name="label"
            {...standardProps}
          />
        </MyPaper>
        <div style={{ height: SpacingSmall }}></div>
        <UnknownNodeEditor
          handleChange={handleChange}
          nodePath={nodePath.concat("next")}
          next={decision.next}
        />
      </>
    );
  }
}
