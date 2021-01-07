import { Grid, IconButton } from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import React from "react";
import { StandardProps, DecisionNode } from "../types";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import DecisionEditor from "./DecisionEditor";
import { NodeHeader } from "./MyText";
import { SpacingLarge, SpacingSmall } from "../styles";

type Props = StandardProps & { node: DecisionNode };

const AddButtonStyle = {
  width: 50,
  height: 50,
};

export default class DecisionNodeEditor extends React.Component<Props, Props> {
  render() {
    const { node, handleChange, nodePath } = this.props;

    const add = () => {
      handleChange(
        node.decisions.concat({
          label: "",
          next: {
            reward:
              "https://files.collective.gg/p/cards/" +
              "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
          },
        }),
        nodePath.concat("decisions")
      );
    };

    const subtract = () => {
      handleChange(
        node.decisions.slice(0, node.decisions.length - 1),
        nodePath.concat("decisions")
      );
    };

    return (
      <div>
        <MyPaper color="decision">
          <NodeHeader>Decision Node</NodeHeader>
          <MyTextField
            parent={node}
            multiline
            name={"eventPicture"}
            nodePath={nodePath}
            handleChange={handleChange}
            label="Event Picture"
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

        <div style={{ paddingTop: SpacingSmall, display: "flex" }}>
          {node.decisions.map((d, idx) => {
            return (
              <div
                style={{
                  width: "100%",
                  paddingRight:
                    idx === node.decisions.length - 1 ? 0 : SpacingLarge,
                }}
                key={idx}
              >
                <DecisionEditor
                  handleChange={handleChange}
                  decision={d}
                  nodePath={nodePath.concat(["decisions", idx.toString()])}
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
