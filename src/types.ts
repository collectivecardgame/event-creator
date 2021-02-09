/* Non-card rewards */
export const NonCardRewards = [
  "Lose a random common card",
  "Lose a random rare card",
  "Pick up to 2 out of 8 units from Yamato (what the fuck luiz)",
];

export const determineType = (node: any) => {
  if (node.title) return "StartNode";
  if (node.decisions) return "DecisionNode";
  if (node.chances) return "ChanceNode";
  return "ResultNode";
};

/* Actual nodes */
export type AllNodes = DecisionNode | ChanceNode | ResultNode;

export type StartNode = DecisionNode & {
  availableInRegion1: boolean;
  availableInRegion2: boolean;
  availableInRegion3: boolean;
  title: string;
};
export type DecisionNode = {
  bodyText: string;
  eventPicture: string;
  decisions: Decision[];
};

export type ChanceNode = {
  chances: Chance[];
};

export type ResultNode = {
  bodyText?: string;
  reward?: string;
  nonCardReward?: string;
  next?: AllNodes;
};

/* Types used in nodes */
export type Decision = {
  label: string;
  next: AllNodes;
};

export type Chance = {
  chance: number;
  next: AllNodes;
};

/* Props and stuff */

export type HandleChangeType = (
  newValue:
    | string
    | boolean
    | number
    | AllNodes
    | Decision[]
    | Chance[]
    | undefined,
  nodePath: string[]
) => void;

export type StandardProps = {
  nodePath: string[];
  handleChange: HandleChangeType;
};

/* Node factories */

// Rest of these go in UnknownNodeEditor
export const decisionNodeFactory: () => DecisionNode = () => ({
  eventPicture:
    "https://files.collective.gg/p/cards/" +
    "2d206e30-4ea2-11ea-a9db-899afb0b8e28-m.png",
  bodyText:
    "Rumours you heard in a nearby town lead you to strange " +
    "ruins in the middle of the mountains. There, you find three objects, " +
    "and behind them, strange writing on a wall…",
  decisions: [
    {
      label: "Continue",
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
  ],
});

export const chanceNodeFactory: () => ChanceNode = () => ({
  chances: [
    {
      chance: 50,
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "996e5c00-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
    {
      chance: 50,
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "b22850c0-2093-11eb-9b99-55cafd69cedf-s.png",
      },
    },
  ],
});

export const resultNodeFactory: () => ResultNode = () => ({
  bodyText: "A fluffy lil' guy starts following you!",
  reward:
    "https://files.collective.gg/p/cards/" +
    "f68aed70-6f8a-11e8-a7a3-e1547b2ef117-s.png",
});

export const fluffyBoiFactory: () => string = () =>
  "https://files.collective.gg/p/cards/" +
  "f68aed70-6f8a-11e8-a7a3-e1547b2ef117-s.png";
