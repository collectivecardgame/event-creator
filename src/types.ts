/* Actual nodes */
type AllNodes = EventDecisionNode | EventChanceNode | EventResultNode;

export type EventStartNode = EventDecisionNode & {
  availableInRegion1: boolean;
  availableInRegion2: boolean;
  availableInRegion3: boolean;
  title: string;
};

export type EventDecisionNode = {
  bodyText: string;
  decisions: EventDecision[];
};

export type EventChanceNode = {
  chances: EventChance[];
};

export type EventResultNode = {
  bodyText?: string;
  reward?: string;
  nonCardReward?: string;
};

/* Types used in nodes */
export type EventDecision = {
  label: string;
  next: AllNodes;
};

export type EventChance = {
  chance: number;
  next: AllNodes;
};

/* Props and stuff */

export type HandleChangeType = (
  newValue: string | boolean | number,
  nodePath: string[]
) => void;

export type StandardProps = {
  nodePath: string[];
  handleChange: HandleChangeType;
};
