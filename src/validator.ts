import {
  AllNodes,
  Chance,
  ChanceNode,
  Decision,
  DecisionNode,
  determineType,
  ResultNode,
  StartNode,
} from "./types";
import { imageUrlValidation } from "./components/MyTextField";
import { countToHopefully100 } from "./components/ChanceNodeEditor";

const jokeTexts = [".", "-", "asdf", "test", "blah", "qwerty"];

const verifier: (baseNode: StartNode) => string[] = (baseNode) => {
  const verificationErrors: string[] = [];

  const nodeSwitchVerifier: (node: AllNodes) => void = (node) => {
    const typeOfNode = determineType(node);

    const decisionNodeStuff = (node: DecisionNode) => {
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
      decisionNodeOrStart.decisions.forEach(recurse);
    };

    const recurse = (poss: Chance | Decision) => {
      if (!!poss.next) {
        nodeSwitchVerifier(poss.next);
      }
    };

    switch (typeOfNode) {
      case "StartNode":
        decisionNodeStuff(node as DecisionNode);
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
        decisionNodeStuff(node as DecisionNode);
        break;

      case "ResultNode":
        const resultNode = node as ResultNode;
        let counter = 0;
        if (resultNode.nonCardReward) counter++;
        if (resultNode.reward) {
          if (!imageUrlValidation(resultNode.reward)) {
            verificationErrors.push(
              "One of your reward cards in a result node is malformed."
            );
          }
          counter++;
        }

        if (counter === 2) {
          verificationErrors.push(
            "One of your result nodes has both a reward card " +
              "and a non-card reward. Unfortunately, our UI isn't big enough " +
              "for this! But you can add another reward node on the end, so " +
              "the player gets them one after another."
          );
        }

        break;
      default:
        break;
    }
  };

  nodeSwitchVerifier(baseNode);
  return verificationErrors;
};

export default verifier;
