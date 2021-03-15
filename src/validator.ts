import {
  AllNodes,
  Chance,
  ChanceNode,
  Decision,
  DecisionNode,
  determineType,
  ResultNode,
  resultNodeTypeDeducer,
  resultNodeTypes,
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
        if (
          !resultNode.resultNodeType ||
          resultNodeTypes.indexOf(resultNode.resultNodeType) === -1
        ) {
          verificationErrors.push(
            "One of your result nodes doesn't have a type. " +
              "Unfortunately, you need to remake this event, because it was " +
              "created with an old version of the event creator. Sorry :(" +
              "\nTry just reselecting your result node types and filling " +
              "in the fields again until this goes away."
          );
        }
        switch (resultNodeTypeDeducer(resultNode)) {
          case "SuperpermanentEffect":
            if (!imageUrlValidation(resultNode.superpermanentEffect!)) {
              verificationErrors.push(
                "One of your superpermanent effects in a result node is " +
                  "malformed."
              );
            }
            break;
          case "CardReward":
            if (!imageUrlValidation(resultNode.reward!)) {
              verificationErrors.push(
                "One of your reward cards in a result node is malformed."
              );
            }
            break;
          case "RecruitCards":
            for (let i = 0; i < resultNode.recruitCardsNumShown!; i++) {
              const url = resultNode.recruitCardUrls![i];
              if (!url) {
                verificationErrors.push(
                  "One of your cards in a 'recruit cards' node is missing."
                );
              } else if (!imageUrlValidation(url)) {
                verificationErrors.push(
                  "One of your cards in a 'recruit cards' node is malformed."
                );
              }
            }
            if (resultNode.recruitCardsMin! > resultNode.recruitCardsMax!) {
              verificationErrors.push(
                "The minimum number of cards the player can recruit must " +
                  "be the same or smaller than the maximum"
              );
            }
            if (
              resultNode.recruitCardsMax! > resultNode.recruitCardsNumShown!
            ) {
              verificationErrors.push(
                "The maximum number of cards the player can recruit must " +
                  "be the same or smaller than the total number of cards shown"
              );
            }
            break;
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
