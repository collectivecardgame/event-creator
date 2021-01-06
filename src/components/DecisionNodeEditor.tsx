import React from "react";
import { TextField } from "@material-ui/core";
import { EventDecisionNode } from "../types";

type Props = { node: EventDecisionNode; nodePath: string[] };

export default class DecisionNodeEditor extends React.Component<Props, Props> {
  handleChange = (event: any) => {
    this.setState({
      node: {
        ...this.state.node,
        [event.target.name]: event.target.checked,
      },
    });
  };

  render() {
    const { node } = this.props;

    return (
      <div>
        <TextField value={node.bodyText} />
      </div>
    );
  }
}
