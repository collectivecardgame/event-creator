import React from "react";
import { Decision, StandardProps } from "../types";
import UnknownNodeEditor from "./UnknownNodeEditor";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import { SpacingSmall } from "../styles";
import { Alert } from "@material-ui/lab";

type Props = StandardProps & {
  decision: Decision;
  noEditing: boolean;
};

export default class DecisionEditor extends React.Component<Props, Props> {
  render() {
    const { decision, nodePath, handleChange, noEditing } = this.props;
    const standardProps: StandardProps = { nodePath, handleChange };
    return (
      <>
        <MyPaper color="decision">
          {noEditing && (
            <Alert severity="warning">
              If there is only one decision, its text will always be "Continue".{" "}
            </Alert>
          )}
          <MyTextField
            parent={decision}
            label="Decision text"
            name="label"
            noEditing={noEditing}
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
