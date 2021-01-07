import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import React from "react";
import { StandardProps, ChanceNode } from "../types";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import ChanceEditor from "./ChanceEditor";
import { NodeHeader } from "./MyText";
import { SpacingLarge, SpacingSmall } from "../styles";

const AddButtonStyle = {
  width: 50,
  height: 50,
};

type Props = StandardProps & { node: ChanceNode };

export default class ChanceNodeEditor extends React.Component<Props, any> {
  render() {
    const { node, handleChange, nodePath } = this.props;

    const add = () => {
      handleChange(
        node.chances.concat({
          chance: 0,
          next: {
            reward:
              "https://files.collective.gg/p/cards/" +
              "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
          },
        }),
        nodePath.concat("chances")
      );
    };

    const subtract = () => {
      handleChange(
        node.chances.slice(0, node.chances.length - 1),
        nodePath.concat("chances")
      );
    };

    const total = node.chances
      .map((c) => parseInt(c.chance.toString()))
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    return (
      <div>
        <MyPaper color="chance">
          <NodeHeader>Chance Node</NodeHeader>
          <MyTextField
            parent={node}
            multiline
            name={"eventPicture"}
            nodePath={nodePath}
            handleChange={handleChange}
            label="Event Picture (Card URL)"
            showAsPosterImage
          />
          <MyTextField
            parent={node}
            multiline
            name={"bodyText"}
            nodePath={nodePath}
            handleChange={handleChange}
            label="Body text"
          />
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
              justifyContent: "space-around",
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
  }
}
