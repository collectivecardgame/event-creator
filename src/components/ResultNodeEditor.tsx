import {
  Checkbox,
  Divider,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { SpacingLarge, SpacingMedium, SpacingSmall } from "../styles";
import {
  decisionNodeFactory,
  ResultNode,
  StandardProps,
  NonCardRewards,
  fluffyBoiFactory,
  lycanthropyFactory,
  NonCardRewardDescriptions,
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
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            style={{ width: 20 }}
            checked={!!node.reward}
            onChange={(e: any, checked: boolean) => {
              let newNode: ResultNode = checked
                ? {
                    reward: fluffyBoiFactory(),
                  }
                : {
                    reward: "",
                  };
              if (!checked) {
                delete node.reward;
              }

              handleChange({ ...node, ...newNode }, nodePath.slice());
            }}
          />
          Card reward?
        </div>

        {node.reward ? (
          <>
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
          </>
        ) : (
          ""
        )}

        <Divider style={{ margin: SpacingMedium }} />

        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            style={{ width: 20 }}
            checked={!!node.superpermanentEffect}
            onChange={(e: any, checked: boolean) => {
              let newNode: ResultNode = checked
                ? {
                    nonCardReward: NonCardRewards[0],
                    superpermanentEffect: lycanthropyFactory(),
                  }
                : {
                    superpermanentEffect: "",
                    nonCardReward: "",
                  };
              if (checked) {
                delete node.reward;
              } else {
                delete node.nonCardReward;
              }

              handleChange({ ...node, ...newNode }, nodePath.slice());
            }}
          />
          Superpermanent effect reward?
        </div>

        {node.nonCardReward ? (
          <Paper
            style={{ backgroundColor: "rgba(255,255,255,0.4)", padding: 5 }}
          >
            <MyTextField
              label="Superpermanent Effect (Card URL)"
              showAsCard
              parent={node}
              multiline
              name={"superpermanentEffect"}
              nodePath={nodePath}
              handleChange={handleChange}
            />
            <br />
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
            <FormHelperText>Superpermanent effect types</FormHelperText>
            <Alert severity="info">
              Superpermanent effects are applied to cards for the rest of the
              run.
              <br />
              Type: {NonCardRewardDescriptions[node.nonCardReward]}.
            </Alert>
          </Paper>
        ) : (
          ""
        )}

        <Divider style={{ margin: SpacingMedium }} />

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

        <Divider style={{ margin: SpacingMedium }} />

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
