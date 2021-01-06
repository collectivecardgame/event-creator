import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React from "react";
import "./App.css";
import { EventStartNode, HandleChangeType } from "./types";
import DecisionEditor from "./components/DecisionEditor";

const Example: EventStartNode = {
  availableInRegion1: true,
  availableInRegion2: true,
  availableInRegion3: true,
  title: "Ancient Artifact",
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
      label: "Pick Mind Orb",
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "b22850c0-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
    {
      label: "Pick Spirit Orb",
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "c8960b90-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
  ],
};

type Props = { node: EventStartNode };
class StartNodeEditor extends React.Component<Props, Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      node: props.node,
    };
  }

  handleChange: HandleChangeType = (newValue, nodePath) => {
    let workingObject: any = this.state.node;

    for (let i = 0; i < nodePath.length; i++) {
      if (i < nodePath.length - 1) {
        workingObject = workingObject[nodePath[i].toString()];
      }
      workingObject[nodePath[i].toString()] = newValue;
    }

    const result = { ...this.state.node, ...workingObject };
    console.log(result);

    this.setState({ node: result });
  };

  handleCheckboxChange = (event: any) => {
    this.handleChange(event.target.checked, [event.target.name]);
  };

  render() {
    const {
      state: { node },
    } = this;

    const {
      availableInRegion1,
      availableInRegion2,
      availableInRegion3,
      bodyText,
      title,
      decisions,
    } = node;
    const AvailableInRegions = [
      availableInRegion1,
      availableInRegion2,
      availableInRegion3,
    ];

    return (
      <div>
        <Paper>
          <Grid spacing={3} className="App" container direction="column">
            <Grid item>
              <header className="App-header">Create an event</header>
            </Grid>

            <Grid item>
              <div>
                <TextField
                  variant="filled"
                  value={title}
                  onChange={(e: any) => {
                    this.handleChange(e.target.value, ["title"]);
                  }}
                  name={`title`}
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

            <Grid item>
              <div>
                <TextField
                  multiline
                  variant="filled"
                  value={bodyText}
                  onChange={(e: any) => {
                    this.handleChange(e.target.value, ["bodyText"]);
                  }}
                  name={`bodyText`}
                />
              </div>
            </Grid>
          </Grid>
        </Paper>

        <Grid container style={{ paddingTop: 20 }} spacing={3}>
          {decisions.map((d, idx) => {
            return (
              <Grid key={d.label} item>
                <DecisionEditor
                  handleChange={this.handleChange}
                  decision={d}
                  nodePath={["decisions", idx.toString()]}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

function App() {
  return <StartNodeEditor node={Example} />;
}

export default App;
