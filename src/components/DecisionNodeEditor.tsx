import {
  Divider,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import { StandardProps, DecisionNode } from "../types";
import MyTextField from "./MyTextField";
import MyPaper from "./MyPaper";
import DecisionEditor from "./DecisionEditor";
import { NodeHeader } from "./MyText";
import { SpacingLarge, SpacingMedium, SpacingSmall } from "../styles";
import audioFiles from "../audioFiles";

type Props = StandardProps & { node: DecisionNode; hideHideControls?: boolean };

const AddButtonStyle = {
  width: 50,
  height: 50,
};

const DecisionNodeEditor = (props: Props) => {
  const { node, handleChange, nodePath } = props;

  const add = () => {
    if (node?.decisions?.length > 5) {
      alert(
        "The interface doesn't have space for more than 6 decisions, sorry"
      );
      return;
    }
    handleChange(
      node.decisions.concat({
        label: "",
        next: {
          reward:
            "https://files.collective.gg/p/cards/" +
            "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
          resultNodeType: "CardReward",
        },
      }),
      nodePath.concat("decisions")
    );
  };

  const subtract = () => {
    const doIt = window.confirm("You're sure you want to delete this node?");
    if (!doIt) return;
    if (node?.decisions?.length < 2) {
      alert(
        "You can't make a decision node with less than 1 choice. " +
          "Maybe you were looking for a reward node -- these will end the " +
          "event."
      );
      return;
    }

    const newDecisions = node.decisions.slice(0, node.decisions.length - 1);
    if (newDecisions.length === 1) {
      newDecisions[0].label = "Continue";
    }
    handleChange(newDecisions, nodePath.concat("decisions"));
  };

  const content = (
    <div>
      <MyPaper color="decision">
        <NodeHeader>Decision Node</NodeHeader>
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

        <Divider style={{ margin: SpacingMedium }} />

        <FormHelperText>
          Sound effect (optional)
          <br />
          This will play when this decision node is shown (not when it finishes)
        </FormHelperText>
        <div style={{ margin: SpacingSmall }}>
          <Select
            style={{ minWidth: 100 }}
            value={node.audioClipName}
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
        </div>

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
                noEditing={node.decisions.length === 1}
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
            justifyContent: "start",
          }}
        >
          <div>
            <IconButton
              disabled={node.decisions?.length === 6}
              aria-label="add"
              onClick={add}
            >
              <AddBoxIcon style={AddButtonStyle} />
            </IconButton>
            <IconButton
              disabled={node.decisions?.length === 1}
              aria-label="subtract"
              onClick={subtract}
            >
              <IndeterminateCheckBoxIcon style={AddButtonStyle} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );

  const withHook = content;

  return props.hideHideControls ? content : withHook;
};

export default DecisionNodeEditor;
