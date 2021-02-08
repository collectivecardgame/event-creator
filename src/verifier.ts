import {
  AllNodes,
  Chance,
  ChanceNode,
  Decision,
  DecisionNode,
  determineType,
  StartNode,
} from "./types";
import { imageUrlValidation } from "./components/MyTextField";
import { countToHopefully100 } from "./components/ChanceNodeEditor";

const jokeTexts = [".", "-", "asdf", "test", "blah", "qwerty"];

const verifier: (baseNode: StartNode) => string[] = (baseNode) => {
  const verificationErrors: string[] = [];

  const nodeSwitchVerifier: (node: AllNodes) => void = (node) => {
    const typeOfNode = determineType(node);

    if (typeOfNode === "DecisionNode" || typeOfNode === "StartNode") {
      const decisionNodeOrStart = node as DecisionNode;
      if (decisionNodeOrStart.eventPicture?.length) {
        if (!imageUrlValidation(decisionNodeOrStart.eventPicture)) {
          verificationErrors.push(
            "One of your Event Picture URLs is malformed. " +
              "The correct formatting should be " +
              '"https://files.collective.gg/p/cards/' +
              'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX-X.png".'
          );
        }
      }

      if (decisionNodeOrStart.bodyText?.length === 0) {
        verificationErrors.push(
          "One of your decision nodes needs body text!" +
            "Decision node body text will look like 'You find yourself in an " +
            "abandoned castle, and a goblin approaches' or something like that."
        );
      }

      const possibleJokeIdx = jokeTexts.indexOf(decisionNodeOrStart.bodyText);
      if (possibleJokeIdx !== -1) {
        verificationErrors.push(
          `Cmon son. Your body text is "${jokeTexts[possibleJokeIdx]}"? smh`
        );
      }

      decisionNodeOrStart.decisions.forEach((d) => {
        if (!d.label) {
          verificationErrors.push(
            "One of your decisions needs text! 'Go left' or 'Eat the fruit'" +
              " or something like that."
          );
        }
      });
    }

    const recurse = (poss: Chance | Decision) => {
      if (!!poss.next) {
        nodeSwitchVerifier(poss.next);
      }
    };

    switch (typeOfNode) {
      case "StartNode":
        const startNode = node as StartNode;
        const {
          availableInRegion1,
          availableInRegion2,
          availableInRegion3,
          title,
        } = startNode;

        if (!title || !title.length) {
          verificationErrors.push(
            "Your event needs an event name! Go to the top of the page."
          );
        }

        if (!availableInRegion1 && !availableInRegion2 && !availableInRegion3) {
          verificationErrors.push(
            "Your event must be available in at least one region."
          );
        }

        startNode.decisions.forEach(recurse);
        break;
      case "ChanceNode":
        const chanceNode = node as ChanceNode;

        const total = countToHopefully100(chanceNode);
        if (total !== 100) {
          verificationErrors.push(
            "One of your chance nodes doesn't add up to 100!"
          );
        }

        chanceNode.chances.forEach(recurse);
        break;
      case "DecisionNode":
        break;
      case "ResultNode":
      default:
        break;
    }
  };

  nodeSwitchVerifier(baseNode);
  return verificationErrors;
};

export default verifier;
