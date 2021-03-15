/* Non-card rewards */
export type ResultNodeType =
  | "CardReward"
  | "SuperpermanentEffect"
  | "SpecificEffect"
  | "RecruitCards"
  | "Nothing";

export const resultNodeTypes = [
  "CardReward",
  "SuperpermanentEffect",
  "SpecificEffect",
  "RecruitCards",
  "Nothing",
];

export const resultNodeTypeDeducer: (node: ResultNode) => ResultNodeType = (
  node
) => {
  if (!!node.reward) {
    return "CardReward";
  } else if (!!node.superpermanentEffect) {
    return "SuperpermanentEffect";
  } else if (!!node.specificEffect) {
    return "SpecificEffect";
  } else if (!!node.recruitCardsNumShown) {
    return "RecruitCards";
  } else {
    return "Nothing";
  }
};

export type SpecificEffectType =
  | "RandomCommonTablet"
  | "RandomUncommonTablet"
  | "RandomRareTablet"
  | "RemoveRandomCommonUnit"
  | "RemoveRandomUncommonUnit"
  | "RemoveRandomRareUnit";

export const specificEffectTypes: SpecificEffectType[] = [
  "RandomCommonTablet",
  "RandomUncommonTablet",
  "RandomRareTablet",
  "RemoveRandomCommonUnit",
  "RemoveRandomUncommonUnit",
  "RemoveRandomRareUnit",
];

export const superpermanentEffectTypes: SuperpermanentEffectType[] = [
  "PickCard",
  "PickUnit",
  "PickAction",
  "RandomCard",
  "RandomUnit",
  "RandomAction",
];

export type SuperpermanentEffectType =
  | "PickCard"
  | "PickUnit"
  | "PickAction"
  | "RandomCard"
  | "RandomUnit"
  | "RandomAction";

export const SuperPermanentEffectTypeDescriptions: Record<
  SuperpermanentEffectType,
  string
> = {
  PickCard:
    "Pick a card from your deck and apply this card as a superpermanent effect",
  PickAction:
    "Pick an action from your deck and apply this card as a superpermanent effect",
  PickUnit:
    "Pick a unit from your deck and apply this card as a superpermanent effect",
  RandomCard:
    "A random card from your deck gets this card as a superpermanent effect",
  RandomAction:
    "A random action from your deck gets this card as a superpermanent effect",
  RandomUnit:
    "A random unit from your deck gets this card as a superpermanent effect",
};

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
  superpermanentEffectType?: SuperpermanentEffectType;
  superpermanentEffect?: string;
  specificEffect?: SpecificEffectType;
  resultNodeType: ResultNodeType;
  next?: AllNodes;
  recruitCardsNumShown?: number;
  recruitCardsMin?: number;
  recruitCardsMax?: number;
  recruitCardUrls?: string[];
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
        resultNodeType: "CardReward",
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
        resultNodeType: "CardReward",
      },
    },
    {
      chance: 50,
      next: {
        reward:
          "https://files.collective.gg/p/cards/" +
          "b22850c0-2093-11eb-9b99-55cafd69cedf-s.png",
        resultNodeType: "CardReward",
      },
    },
  ],
});

export const resultNodeFactory: () => ResultNode = () => ({
  bodyText: "",
  reward:
    "https://files.collective.gg/p/cards/" +
    "f68aed70-6f8a-11e8-a7a3-e1547b2ef117-s.png",
  resultNodeType: "CardReward",
});

export const sixSwordsFactory: () => string[] = () => {
  return [
    "https://files.collective.gg/p/cards/" +
      "550d0d00-a59c-11e8-9f7b-15763551309c-s.png",
    "https://files.collective.gg/p/cards/" +
      "e91a1ee0-8c7b-11e9-b576-653fd111ec1d-s.png",
    "https://files.collective.gg/p/cards/" +
      "06188e20-0505-11eb-9cd7-1d9c4ecb9715-s.png",
    "https://files.collective.gg/p/cards/" +
      "144319f0-5ca2-11e9-b569-6b99f5628edc-s.png",
    "https://files.collective.gg/p/cards/" +
      "b8d8e2b0-cd9a-11e9-a691-191fdee786eb-s.png",
    "https://files.collective.gg/p/cards/" +
      "90917650-e18a-11ea-95a9-378c25967544-s.png",
  ];
};

export const fluffyBoiFactory: () => string = () =>
  "https://files.collective.gg/p/cards/" +
  "f68aed70-6f8a-11e8-a7a3-e1547b2ef117-s.png";

export const lycanthropyFactory: () => string = () =>
  "https://files.collective.gg/p/cards/" +
  "a2afec20-7633-11eb-8e6f-0f23996ac484-s.png";
