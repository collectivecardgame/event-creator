/* Actual nodes */
type AllNodes = EventDecisionNode | EventChanceNode | EventResultNode;

export type EventStartNode = EventDecisionNode & {
  AvailableInRegion1: boolean;
  AvailableInRegion2: boolean;
  AvailableInRegion3: boolean;
  Title: string;
};

export type EventDecisionNode = {
  BodyText: string;
  Decisions: EventDecision[];
};

export type EventChanceNode = {
  Chances: EventChance[];
};

export type EventResultNode = {
  BodyText?: string;
  Reward?: string;
  NonCardReward?: string;
};

/* Types used in nodes */
export type EventDecision = {
  Label: string;
  Next: AllNodes;
};

export type EventChance = {
  Chance: number;
  Next: AllNodes;
};
