import { Paper, TextField } from "@material-ui/core";
import React from "react";
import { EventDecision, EventDecisionNode, StandardProps } from "../types";
import DecisionNodeEditor from "./DecisionNodeEditor";

type Props = StandardProps & {
  decision: EventDecision;
};

export default class DecisionEditor extends React.Component<Props, Props> {
  render() {
    const { decision, nodePath, handleChange } = this.props;
    return (
      <Paper style={{ padding: 10 }}>
        <TextField
          variant="filled"
          value={decision.label}
          onChange={(e: any) => {
            handleChange(e.target.value, nodePath.concat(["label"]));
          }}
          name={`label`}
        />
        <DecisionNodeEditor
          node={decision.next as EventDecisionNode}
          nodePath={nodePath}
        />
      </Paper>
    );
  }
}
