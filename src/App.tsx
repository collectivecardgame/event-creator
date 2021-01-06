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

const Example: StartNode = {
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

const THEME = createMuiTheme({
  palette: {
    type: "dark",
  },
});

type Props = { node: StartNode };
class StartNodeEditor extends React.Component<Props, Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      node: props.node,
    };
  }

  handleChange: HandleChangeType = (newValue, nodePath) => {
    let workingObject: any = this.state.node;

    console.log(this.state.node);
    for (let i = 0; i < nodePath.length; i++) {
      if (i < nodePath.length - 1) {
        console.log(nodePath[i].toString());
        workingObject = workingObject[nodePath[i].toString()];
        console.log(workingObject);
      } else {
        workingObject[nodePath[i].toString()] = newValue;
      }
    }

    console.log(this.state.node);

    this.setState({ node: this.state.node });
  };

  handleCheckboxChange = (event: any) => {
    this.handleChange(event.target.checked, [event.target.name]);
  };

  render() {
    const {
      state: { node },
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
        />
        {/*
        // <div style={{ display: "flex", paddingTop: 20, width: "100%" }}>
        //   {node.decisions.map((d, idx) => {
        //     return (
        //       <Grid
        //         key={d.label}
        //         item
        //         style={{ width: "100%", marginRight: 10 }}
        //       >
        //         <DecisionEditor
        //           handleChange={this.handleChange}
        //           decision={d}
        //           nodePath={["decisions", idx.toString()]}
        //         />
        //       </Grid>
        //     );
        //   })}
        // </div>
*/}
        <div style={{ height: SpacingLarge }} />
        <MyPaper color="json">
          <TextField
            style={{ width: "100%" }}
            multiline
            value={JSON.stringify(node)}
          />
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
