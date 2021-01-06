import { Grid } from "@material-ui/core";
import React from "react";
import { ResultNode, StandardProps } from "../types";
import MyPaper from "./MyPaper";
import { NodeHeader } from "./MyText";
import MyTextField from "./MyTextField";

type Props = StandardProps & { node: ResultNode };

export default class ResultNodeEditor extends React.Component<Props, Props> {
  render() {
    const { handleChange, nodePath, node } = this.props;
    return (
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
              label="Card reward url"
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
        </Grid>
      </MyPaper>
    );
  }
}
