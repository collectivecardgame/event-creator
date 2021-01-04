import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import React from "react";
import "./App.css";
import { EventStartNode } from "./types";

const Example: EventStartNode = {
  AvailableInRegion1: true,
  AvailableInRegion2: true,
  AvailableInRegion3: true,
  Title: "Ancient Artifact",
  BodyText:
    "Rumours you heard in the last town you were at lead you to strange " +
    "ruins in the middle of the mountains. There, you find three objects, " +
    "and behind them, strange writing on a wall…",
  Decisions: [
    {
      Label: "Pick Strength Orb",
      Next: {
        Reward:
          "https://files.collective.gg/p/cards/" +
          "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
    {
      Label: "Pick Mind Orb",
      Next: {
        Reward:
          "https://files.collective.gg/p/cards/" +
          "b22850c0-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
    {
      Label: "Pick Spirit Orb",
      Next: {
        Reward:
          "https://files.collective.gg/p/cards/" +
          "c8960b90-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
  ],
};

type Props = { startNode: EventStartNode };
class StartNodeEditor extends React.Component<Props, Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      startNode: props.startNode,
    };
  }

  handleChange = (event: any) => {
    this.setState({
      startNode: {
        ...this.state.startNode,
        [event.target.name]: event.target.checked,
      },
    });
  };

  render() {
    const {
      state: { startNode },
    } = this;

    const {
      AvailableInRegion1,
      AvailableInRegion2,
      AvailableInRegion3,
    } = startNode;
    const AvailableInRegions = [
      AvailableInRegion1,
      AvailableInRegion2,
      AvailableInRegion3,
    ];

    return (
      <div className="App">
        <header className="App-header">Create an event</header>
        <FormGroup row>
          {AvailableInRegions.map((a, idx) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={a}
                  onChange={this.handleChange}
                  name={`AvailableInRegion${idx + 1}`}
                />
              }
              label={`Available In Region ${idx + 1}`}
            />
          ))}
        </FormGroup>
      </div>
    );
  }
}

function App() {
  return <StartNodeEditor startNode={Example} />;
}

export default App;
