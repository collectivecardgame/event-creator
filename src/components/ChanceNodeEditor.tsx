import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import React, { useState } from "react";
import { StandardProps, ChanceNode } from "../types";
import MyPaper from "./MyPaper";
import ChanceEditor from "./ChanceEditor";
import { NodeHeader } from "./MyText";
import { SpacingLarge, SpacingSmall } from "../styles";

const AddButtonStyle = {
  width: 50,
  height: 50,
};

type Props = StandardProps & { node: ChanceNode };

export const countToHopefully100 = (node: ChanceNode) => {
  return node.chances
    .map((c) => parseInt(c.chance.toString()))
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
};

const ChanceNodeEditor = (props: Props) => {
  const { node, handleChange, nodePath } = props;

  const add = () => {
    handleChange(
      node.chances.concat({
        chance: 10,
        next: {
          reward:
            "https://files.collective.gg/p/cards/" +
            "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
          resultNodeType: "CardReward",
        },
      }),
      nodePath.concat("chances")
    );
  };

  const subtract = () => {
    const doIt = window.confirm("You're sure you want to delete this node?");
    if (!doIt) return;
    if (node?.chances?.length < 3) {
      alert(
        "The purpose of a chance node is to randomly choose between a " +
          "few different outcomes. The player will not see this... " +
          "for this reason, it doesn't make sense to have less than two " +
          "possibilities."
      );
      return;
    }
    handleChange(
      node.chances.slice(0, node.chances.length - 1),
      nodePath.concat("chances")
    );
  };

  const total = countToHopefully100(node);

  return (
    <div>
      <MyPaper color="chance">
        <NodeHeader>Chance Node</NodeHeader>
      </MyPaper>

      {total !== 100 && (
        <Alert severity="error">Chances must add up to 100!</Alert>
      )}

      <div style={{ paddingTop: SpacingSmall, display: "flex" }}>
        {node.chances.map((d, idx) => {
          return (
            <div
              style={{
                width: "100%",
                paddingRight:
                  idx === node.chances.length - 1 ? 0 : SpacingLarge,
              }}
              key={idx}
            >
              <ChanceEditor
                handleChange={handleChange}
                chance={d}
                nodePath={nodePath.concat(["chances", idx.toString()])}
              />
            </div>
          );
        })}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div>
            <IconButton aria-label="add" onClick={add}>
              <AddBoxIcon style={AddButtonStyle} />
            </IconButton>
            <IconButton aria-label="subtract" onClick={subtract}>
              <IndeterminateCheckBoxIcon style={AddButtonStyle} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChanceNodeEditor;
