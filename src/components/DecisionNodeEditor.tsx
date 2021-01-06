import { Grid } from "@material-ui/core";
import React from "react";
import { StandardProps, DecisionNode } from "../types";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import DecisionEditor from "./DecisionEditor";
import { NodeHeader } from "./MyText";
import { SpacingLarge, SpacingSmall } from "../styles";

type Props = StandardProps & { node: DecisionNode };

export default class DecisionNodeEditor extends React.Component<Props, Props> {
  render() {
    const { node, handleChange, nodePath } = this.props;

    return (
      <div>
        <MyPaper color="decision">
          <NodeHeader>Decision Node</NodeHeader>
          <MyTextField
            parent={node}
            multiline
            name={"bodyText"}
            nodePath={nodePath}
            handleChange={handleChange}
            label="Body text"
          />
        </MyPaper>

        <div style={{ paddingTop: SpacingSmall, display: "flex" }}>
          {node.decisions.map((d, idx) => {
            return (
              <div
                style={{
                  width: "100%",
                  paddingRight:
                    idx === node.decisions.length - 1 ? 0 : SpacingLarge,
                }}
                key={idx}
              >
                <DecisionEditor
                  handleChange={handleChange}
                  decision={d}
                  nodePath={nodePath.concat(["decisions", idx.toString()])}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
