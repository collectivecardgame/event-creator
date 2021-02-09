import { InputLabel, MenuItem, Select, Slide } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import {
  StandardProps,
  AllNodes,
  determineType,
  ChanceNode,
  DecisionNode,
  ResultNode,
  resultNodeFactory,
  chanceNodeFactory,
  decisionNodeFactory,
} from "../types";
import DecisionNodeEditor from "./DecisionNodeEditor";
import ResultNodeEditor from "./ResultNodeEditor";
import ChanceNodeEditor from "./ChanceNodeEditor";
import MyPaper, { Color } from "./MyPaper";
import { SpacingSmall } from "../styles";
import { NodeHeader } from "./MyText";

type Props = StandardProps & {
  next: AllNodes;
};

const UnknownNodeEditor = (props: Props) => {
  const { handleChange, nodePath, next } = props;
  const [show, setShow] = useState(true);

  const handleSetShow = (event: any, newValue: boolean) => setShow(newValue);
  const nodeProps = {
    handleChange,
    nodePath: nodePath.slice(),
  };

  const style = { width: 16, height: 16 };

  let nodeEditor = null;
  const typeOfNode = determineType(next);
  let color: Color = "";

  switch (typeOfNode) {
    case "ChanceNode":
      nodeEditor = (
        <ChanceNodeEditor node={next as ChanceNode} {...nodeProps} />
      );
      color = "chance";
      break;
    case "DecisionNode":
      nodeEditor = (
        <DecisionNodeEditor node={next as DecisionNode} {...nodeProps} />
      );
      color = "decision";
      break;
    case "ResultNode":
    default:
      nodeEditor = (
        <ResultNodeEditor node={next as ResultNode} {...nodeProps} />
      );
      color = "result";
      break;
  }

  return (
    <div style={{ zIndex: 5, position: "relative" }}>
      <MyPaper color={color}>
        <NodeHeader id="demo-simple-select-label">Node type</NodeHeader>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{ minWidth: 100 }}
            value={typeOfNode}
            onChange={(newValue: any) => {
              let newNode;

              switch (newValue.target.value) {
                case "ResultNode":
                  newNode = resultNodeFactory();
                  break;
                case "ChanceNode":
                  newNode = chanceNodeFactory();
                  break;
                case "DecisionNode":
                  newNode = decisionNodeFactory();
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

          <ToggleButtonGroup
            value={show}
            exclusive
            onChange={handleSetShow}
            aria-label="text alignment"
            style={{ marginBottom: 5 }}
          >
            <ToggleButton value={true} aria-label="left aligned">
              <VisibilityIcon style={style} />
            </ToggleButton>
            <ToggleButton value={false} aria-label="left aligned">
              <VisibilityOffIcon style={style} />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </MyPaper>
      <Slide direction="up" in={show} mountOnEnter unmountOnExit>
        <div style={{ paddingTop: SpacingSmall }}>{nodeEditor}</div>
      </Slide>
    </div>
  );
};

export default UnknownNodeEditor;
