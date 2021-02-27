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
  SuperPermanentEffectTypeDescriptions,
  fluffyBoiFactory,
  lycanthropyFactory,
  superpermanentEffectTypes,
  resultNodeTypes,
  ResultNodeType,
  specificEffectTypes,
  SpecificEffectType,
} from "../types";
import MyPaper from "./MyPaper";
import { NodeHeader } from "./MyText";
import MyTextField from "./MyTextField";
import UnknownNodeEditor from "./UnknownNodeEditor";

type Props = StandardProps & { node: ResultNode };

const ResultNodeEditor = (props: Props) => {
  const { handleChange, nodePath, node } = props;

  let rnType: ResultNodeType;
  if (!!node.reward) {
    rnType = "Card Reward";
  } else if (!!node.superpermanentEffect) {
    rnType = "Superpermanent Effect";
  } else if (!!node.specificEffect) {
    rnType = "Specific Effect";
  } else {
    rnType = "Nothing";
  }

  return (
    <>
      <MyPaper color="result">
        <NodeHeader>Result Node</NodeHeader>
        <Select
          style={{ minWidth: 100 }}
          value={rnType}
          onChange={(newValue: any) => {
            let newNode: ResultNode = {
              next: node.next,
            };

            const nv: ResultNodeType = newValue.target.value as ResultNodeType;

            switch (nv) {
              case "Card Reward":
                newNode.reward = fluffyBoiFactory();
                break;
              case "Superpermanent Effect":
                newNode.superpermanentEffect = lycanthropyFactory();
                newNode.superpermanentEffectType = superpermanentEffectTypes[0];
                break;
              case "Specific Effect":
                newNode.specificEffect = specificEffectTypes[0];
                break;
              case "Nothing":
                break;
            }
            handleChange(newNode, nodePath.slice());
          }}
        >
          {resultNodeTypes.map((ncr) => (
            <MenuItem value={ncr}>{ncr}</MenuItem>
          ))}
        </Select>

        <Divider style={{ margin: SpacingMedium }} />

        {rnType === "Card Reward" ? (
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

        {rnType === "Superpermanent Effect" ? (
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
              value={node.superpermanentEffectType}
              onChange={(newValue: any) => {
                handleChange(
                  newValue.target.value,
                  nodePath.slice().concat("superpermanentEffectType")
                );
              }}
            >
              {superpermanentEffectTypes.map((ncr) => (
                <MenuItem value={ncr}>{ncr}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Superpermanent effect types</FormHelperText>
            <Alert severity="info">
              Superpermanent effects are applied to cards for the rest of the
              run.
              <br />
              Type:{" "}
              {
                SuperPermanentEffectTypeDescriptions[
                  node.superpermanentEffectType!
                ]
              }
              .
            </Alert>
          </Paper>
        ) : (
          ""
        )}
        {rnType === "Specific Effect" ? (
          <div>
            <Select
              style={{ minWidth: 100 }}
              value={node.specificEffect}
              onChange={(newValue: any) => {
                handleChange(
                  newValue.target.value as SpecificEffectType,
                  nodePath.slice().concat("specificEffect")
                );
              }}
            >
              {specificEffectTypes.map((ncr) => (
                <MenuItem value={ncr}>{ncr}</MenuItem>
              ))}
            </Select>
          </div>
        ) : (
          ""
        )}

        {rnType !== "Nothing" ? (
          <Divider style={{ margin: SpacingMedium }} />
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
