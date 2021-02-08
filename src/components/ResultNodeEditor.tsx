import { Checkbox, Grid } from "@material-ui/core";
import React from "react";
import { ResultNode, StandardProps } from "../types";
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
          <Grid item>
            <MyTextField
              label="Body text"
              parent={node}
              multiline
              name={"bodyText"}
              nodePath={nodePath}
              handleChange={handleChange}
            />
          </Grid>
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
          <Grid item>
            <MyTextField
              label="Non-card reward"
              parent={node}
              multiline
              name={"nonCardReward"}
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
                  handleChange(
                    {
                      bodyText: "",
                      eventPicture: "",
                      decisions: [],
                    },
                    nodePath.concat("next")
                  );
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
