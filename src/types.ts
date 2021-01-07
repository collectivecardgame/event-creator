/* Non-card rewards */
export const NonCardRewards = [
  "Lose a random common card",
  "Lose a random rare card",
  "Pick up to 2 out of 8 units from Yamato (what the fuck luiz)",
];

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

export const determineType = (node: any) => {
  if (node.title) return "StartNode";
  if (node.decisions) return "DecisionNode";
  if (node.chances) return "ChanceNode";
  return "ResultNode";
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
