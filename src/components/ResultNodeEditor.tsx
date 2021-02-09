import {
  Checkbox,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
import { SpacingSmall } from "../styles";
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

type Props = StandardProps & { node: ResultNode };

const ResultNodeEditor = (props: Props) => {
  const { handleChange, nodePath, node } = props;

  return (
    <>
      <MyPaper color="result">
        <NodeHeader>Result Node</NodeHeader>
        <Grid container direction="column">
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
            Use a non-card reward?
          </div>

          {node.nonCardReward ? (
            <Grid item>
              <Select
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
              <FormHelperText>Non-card reward types</FormHelperText>
            </Grid>
          ) : (
            ""
          )}

          <Grid item style={{ paddingTop: SpacingSmall }}>
            <MyTextField
              label="Body text"
              parent={node}
              multiline
              name={"bodyText"}
              nodePath={nodePath}
              handleChange={handleChange}
            />
          </Grid>

          <FormHelperText>
            Note: Body text is optional for result nodes.
          </FormHelperText>

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
          <FormHelperText>
            Note: Also optional, good for chains of rewards.
          </FormHelperText>
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

      {!node.next && <MyPaper color="jsonsuccess">END OF EVENT</MyPaper>}
    </>
  );
};

export default ResultNodeEditor;
