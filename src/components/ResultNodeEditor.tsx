import { Checkbox, Grid, MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import {
  decisionNodeFactory,
  ResultNode,
  StandardProps,
  NonCardRewards,
  fluffyBoiFactory,
} from "../types";
import MyPaper from "./MyPaper";
import { NodeHeader } from "./MyText";
import MyTextField from "./MyTextField";
import UnknownNodeEditor from "./UnknownNodeEditor";
import useHideShowHook from "./useHideShowHook";

type Props = StandardProps & { node: ResultNode };

const ResultNodeEditor = (props: Props) => {
  const { handleChange, nodePath, node } = props;

  return useHideShowHook(
    false,
    <>
      <MyPaper color="result">
        <NodeHeader>Result Node</NodeHeader>
        <Grid container direction="column">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              style={{ width: 20 }}
              checked={!node.reward}
              onChange={(e: any, checked: boolean) => {
                let newNode: ResultNode = checked
                  ? { nonCardReward: NonCardRewards[0], reward: "" }
                  : { reward: fluffyBoiFactory(), nonCardReward: "" };
                if (checked) {
                  delete node.reward;
                } else {
                  delete node.nonCardReward;
                }

                handleChange({ ...node, ...newNode }, nodePath.slice());
              }}
            />
            Non-card reward
          </div>

          {node.reward ? (
            <Grid item>
              <MyTextField
                label="Card Reward (Card URL)"
                showAsCard
                parent={node}
                multiline
                name={"reward"}
                nodePath={nodePath}
                handleChange={handleChange}
              />
            </Grid>
          ) : (
            ""
          )}

          {node.nonCardReward ? (
            <Grid item>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{ minWidth: 100 }}
                value={node.nonCardReward}
                onChange={(newValue: any) => {
                  handleChange(
                    newValue.target.value,
                    nodePath.slice().concat("nonCardReward")
                  );
                }}
              >
                {NonCardRewards.map((ncr) => (
                  <MenuItem value={ncr}>{ncr}</MenuItem>
                ))}
              </Select>
            </Grid>
          ) : (
            ""
          )}

          <Grid item>
            <MyTextField
              label="Body text (optional in result nodes)"
              parent={node}
              multiline
              name={"bodyText"}
              nodePath={nodePath}
              handleChange={handleChange}
            />
          </Grid>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              style={{ width: 20 }}
              checked={!!node.next}
              onChange={(e: any) => {
                if (e.target.checked) {
                  handleChange(decisionNodeFactory(), nodePath.concat("next"));
                } else {
                  handleChange(undefined, nodePath.concat("next"));
                }
              }}
            />
            Additional Node
          </div>
        </Grid>
      </MyPaper>
      {!!node.next && (
        <div style={{ flexDirection: "row" }}>
          <UnknownNodeEditor
            handleChange={handleChange}
            nodePath={nodePath.concat("next")}
            next={node.next}
          />
        </div>
      )}

      {!node.next && <MyPaper color="json">END OF EVENT</MyPaper>}
    </>
  );
};

export default ResultNodeEditor;
