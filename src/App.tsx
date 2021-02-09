import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core";
import React from "react";
import "./App.css";
import { StartNode, HandleChangeType } from "./types";
import MyPaper from "./components/MyPaper";
import MyTextField from "./components/MyTextField";
import DecisionNodeEditor from "./components/DecisionNodeEditor";
import { SpacingLarge } from "./styles";
import { Alert } from "@material-ui/lab";
import verifier from "./validator";

const Example: StartNode = {
  availableInRegion1: true,
  availableInRegion2: true,
  availableInRegion3: true,
  title: "Ancient Artifact",
  eventPicture:
    "https://files.collective.gg/p/cards/" +
    "2d206e30-4ea2-11ea-a9db-899afb0b8e28-m.png",
  bodyText:
    "Rumours you heard in a nearby town lead you to strange " +
    "ruins in the middle of the mountains. There, you find three objects, " +
    "and behind them, strange writing on a wall…",
  decisions: [
    {
      label: "Pick Strength Orb",
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
    {
      label: "Get something fluffy",
      next: {
        chances: [
          {
            chance: 50,
            next: {
              reward:
                "https://files.collective.gg/p/cards/" +
                "f68aed70-6f8a-11e8-a7a3-e1547b2ef117-s.png",
            },
          },
          {
            chance: 50,
            next: {
              reward:
                "https://files.collective.gg/p/cards/" +
                "66665a40-74d5-11e8-9297-1d775ab12b96-m.png",
            },
          },
        ],
      },
    },
    {
      label: "Pick Mind Orb",
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "b22850c0-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
  ],
};

const THEME = createMuiTheme({
  palette: {
    type: "dark",
  },
});

type Props = { node: StartNode };
type State = Props & {
  validationFailures: string[];
};
class StartNodeEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      node: props.node,
      validationFailures: [],
    };
  }

  handleChange: HandleChangeType = (newValue, nodePath) => {
    let workingObject: any = this.state.node;

    for (let i = 0; i < nodePath.length; i++) {
      if (i < nodePath.length - 1) {
        console.log(nodePath[i].toString());
        workingObject = workingObject[nodePath[i].toString()];
        console.log(workingObject);
      } else {
        workingObject[nodePath[i].toString()] = newValue;
      }
    }

    this.setState({
      node: this.state.node,
      validationFailures: verifier(this.state.node),
    });
  };

  handleCheckboxChange = (event: any) => {
    this.handleChange(event.target.checked, [event.target.name]);
  };

  render() {
    const {
      state: { node, validationFailures },
    } = this;

    const AvailableInRegions = [
      node.availableInRegion1,
      node.availableInRegion2,
      node.availableInRegion3,
    ];

    return (
      <div>
        <MyPaper>
          <Grid spacing={3} className="App" container direction="column">
            <Grid item>
              <header className="App-header">Event Creator</header>
            </Grid>

            <Grid item>
              <div>
                <MyTextField
                  label="Event name"
                  parent={node}
                  nodePath={[]}
                  name="title"
                  handleChange={this.handleChange}
                />
              </div>
            </Grid>

            <Grid item>
              {AvailableInRegions.map((a, idx) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={a}
                      onChange={this.handleCheckboxChange}
                      name={`availableInRegion${idx + 1}`}
                    />
                  }
                  label={`Available In Region ${idx + 1}`}
                />
              ))}
            </Grid>
          </Grid>
        </MyPaper>

        <DecisionNodeEditor
          handleChange={this.handleChange}
          nodePath={[]}
          node={node}
          hideHideControls={true}
        />

        <div style={{ height: SpacingLarge }} />
        <MyPaper color={validationFailures.length ? "json" : "jsonsuccess"}>
          <h3>Full event logic -- copy and paste this</h3>
          {validationFailures.length ? (
            validationFailures.map((f) => <Alert severity="error">{f}</Alert>)
          ) : (
            <TextField
              style={{ width: "100%" }}
              multiline
              value={JSON.stringify(node)}
            />
          )}
        </MyPaper>
      </div>
    );
  }
}

function App() {
  return (
    <MuiThemeProvider theme={THEME}>
      <StartNodeEditor node={Example} />
    </MuiThemeProvider>
  );
}

export default App;
