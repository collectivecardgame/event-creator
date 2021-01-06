import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import {
  StandardProps,
  AllNodes,
  determineType,
  ChanceNode,
  DecisionNode,
  ResultNode,
} from "../types";
import DecisionNodeEditor from "./DecisionNodeEditor";
import ResultNodeEditor from "./ResultNodeEditor";
import ChanceNodeEditor from "./ChanceNodeEditor";
import MyPaper from "./MyPaper";
import { SpacingLarge, SpacingSmall } from "../styles";

type Props = StandardProps & {
  next: AllNodes;
};

export default class UnknownNodeEditor extends React.Component<Props, any> {
  render() {
    const { handleChange, nodePath } = this.props;
    const nodeProps = {
      handleChange,
      nodePath: nodePath.slice(),
    };
    let nodeEditor = null;
    const typeOfNode = determineType(this.props.next);
    switch (typeOfNode) {
      case "ChanceNode":
        nodeEditor = (
          <ChanceNodeEditor
            node={this.props.next as ChanceNode}
            {...nodeProps}
          />
        );
        break;
      case "DecisionNode":
        nodeEditor = (
          <DecisionNodeEditor
            node={this.props.next as DecisionNode}
            {...nodeProps}
          />
        );
        break;
      case "ResultNode":
      default:
        nodeEditor = (
          <ResultNodeEditor
            node={this.props.next as ResultNode}
            {...nodeProps}
          />
        );
        break;
    }

    return (
      <div>
        <MyPaper>
          <InputLabel id="demo-simple-select-label">Node type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ minWidth: 100 }}
            value={typeOfNode}
            onChange={(newValue: any) => {
              let newNode;
              let resultNode = {
                bodyText: "Result Body Text",
                reward: "Result Card URL",
                nonCardReward: "Result Non-card Effect",
              };

              switch (newValue.target.value) {
                case "ResultNode":
                  newNode = resultNode;
                  break;
                case "ChanceNode":
                  newNode = {
                    chances: [
                      {
                        chance: 100,
                        next: resultNode,
                      },
                    ],
                  };
                  break;
                case "DecisionNode":
                  newNode = {
                    bodyText: "",
                    decisions: [
                      {
                        next: resultNode,
                        label: "Result",
                      },
                    ],
                  };
                  break;
                default:
                  break;
              }

              handleChange(newNode as any, nodePath.slice());
            }}
          >
            <MenuItem value={"DecisionNode"}>Decision</MenuItem>
            <MenuItem value={"ChanceNode"}>Chance</MenuItem>
            <MenuItem value={"ResultNode"}>Result</MenuItem>
          </Select>
        </MyPaper>
        <div style={{ paddingTop: SpacingSmall }}>{nodeEditor}</div>
      </div>
    );
  }
}
