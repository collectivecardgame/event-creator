import {
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { SpacingMedium, SpacingSmall } from "../styles";
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
  resultNodeTypeDeducer,
  sixSwordsFactory,
} from "../types";
import MyPaper from "./MyPaper";
import { NodeHeader } from "./MyText";
import MyTextField from "./MyTextField";
import UnknownNodeEditor from "./UnknownNodeEditor";
import audioFiles from "../audioFiles";
import React from "react";

type Props = StandardProps & { node: ResultNode };

const ResultNodeEditor = (props: Props) => {
  const { handleChange, nodePath, node } = props;

  const rnType = resultNodeTypeDeducer(node);

  const numCardsShownArray = [];
  if (node?.recruitCardsNumShown) {
    for (let i = 0; i < node.recruitCardsNumShown!; i++) {
      numCardsShownArray.push(i);
    }
  }

  return (
    <>
      <MyPaper color="result">
        <NodeHeader>Result Node</NodeHeader>
        <Select
          style={{ minWidth: 100 }}
          value={rnType}
          onChange={(newValue: any) => {
            const nv: ResultNodeType = newValue.target.value as ResultNodeType;

            let newNode: ResultNode = {
              next: node.next,
              resultNodeType: nv,
              bodyText: node.bodyText,
            };

            switch (nv) {
              case "CardReward":
                newNode.reward = fluffyBoiFactory();
                break;
              case "SuperpermanentEffect":
                newNode.superpermanentEffect = lycanthropyFactory();
                newNode.superpermanentEffectType = superpermanentEffectTypes[0];
                break;
              case "SpecificEffect":
                newNode.specificEffect = specificEffectTypes[0];
                break;
              case "RecruitCards":
                newNode.recruitCardsNumShown = 6;
                newNode.recruitCardsMin = 1;
                newNode.recruitCardsMax = 1;
                newNode.recruitCardUrls = sixSwordsFactory();
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

        {rnType === "CardReward" ? (
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

        {rnType === "SuperpermanentEffect" ? (
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

        {rnType === "RecruitCards" ? (
          <Paper style={{ backgroundColor: "rgba(0,0,0,0.4)", padding: 5 }}>
            <MyTextField
              number
              parent={node}
              label="Min cards to recruit"
              name="recruitCardsMin"
              nodePath={nodePath}
              handleChange={handleChange}
              forceMinNum={1}
              forceMaxNum={8}
            />
            <MyTextField
              number
              parent={node}
              label="Max cards to recruit"
              name="recruitCardsMax"
              nodePath={nodePath}
              handleChange={handleChange}
              forceMinNum={1}
              forceMaxNum={8}
            />
            <MyTextField
              number
              parent={node}
              label="Total cards to show"
              nodePath={nodePath}
              name="recruitCardsNumShown"
              handleChange={handleChange}
              forceMinNum={2}
              forceMaxNum={8}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {numCardsShownArray.map((_, idx) => (
                <MyTextField
                  label={
                    "Card to recruit choice " +
                    (idx + 1) +
                    "/" +
                    numCardsShownArray.length
                  }
                  showAsCard
                  parent={node.recruitCardUrls}
                  multiline
                  name={idx.toString()}
                  nodePath={nodePath.concat("recruitCardUrls")}
                  handleChange={handleChange}
                />
              ))}
            </div>
            <br />
            <Alert severity="info">
              The player will be able to recruit{" "}
              {node.recruitCardsMin === node.recruitCardsMax
                ? node.recruitCardsMin
                : "between " +
                  node.recruitCardsMin +
                  " and " +
                  node.recruitCardsMax}{" "}
              of these {node.recruitCardsNumShown} cards.
            </Alert>
          </Paper>
        ) : (
          ""
        )}

        {rnType === "SpecificEffect" ? (
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

        {rnType !== "RecruitCards" ? (
          <>
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
          </>
        ) : (
          ""
        )}

        <FormControl>
          <FormHelperText>
            Sound effect (optional)
            <br />
            This will play when this result node is shown (not when it finishes)
          </FormHelperText>
          <Select
            style={{ minWidth: 100 }}
            value={node.audioClipName || ""}
            placeholder="Sound effect"
            displayEmpty
            onChange={(newValue: any) => {
              handleChange(
                newValue.target.value,
                nodePath.slice().concat("audioClipName")
              );
              setTimeout(() => {
                (document.querySelector(
                  'audio[data-nodepath="' + nodePath + '"]'
                ) as HTMLAudioElement)?.play();
              });
            }}
          >
            {audioFiles.map((ncr) => (
              <MenuItem value={ncr}>{ncr === "" ? "None" : ncr}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {node.audioClipName ? (
          <div style={{ margin: SpacingSmall }}>
            <audio
              data-nodepath={nodePath}
              src={"/clips/" + node.audioClipName + ".wav.mp3"}
              controls
            />
          </div>
        ) : (
          ""
        )}

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
