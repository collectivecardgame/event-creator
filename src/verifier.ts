import {
  AllNodes,
  Chance,
  Decision,
  DecisionNode,
  determineType,
  StartNode,
} from "./types";
import { imageUrlValidation } from "./components/MyTextField";

const verifier: (baseNode: StartNode) => string[] = (baseNode) => {
  const verificationErrors: string[] = [];

  const nodeSwitchVerifier: (node: AllNodes) => void = (node) => {
    const typeOfNode = determineType(node);

    if (typeOfNode === "DecisionNode" || typeOfNode === "StartNode") {
      const nodeWithPicture = node as DecisionNode;
      if (nodeWithPicture.eventPicture?.length) {
        if (!imageUrlValidation(nodeWithPicture.eventPicture)) {
          verificationErrors.push(
            "One of your Event Picture URLs is malformed. " +
              "The correct formatting should be " +
              '"https://files.collective.gg/p/cards/' +
              'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX-X.png".'
          );
        }
      }
    }

    const recurse = (poss: Chance | Decision) => {
      if (!!poss.next) {
      }
    };

    switch (typeOfNode) {
      case "StartNode":
        const startNode = node as StartNode;
        const {
          availableInRegion1,
          availableInRegion2,
          availableInRegion3,
        } = startNode;

        if (!availableInRegion1 && !availableInRegion2 && !availableInRegion3) {
          verificationErrors.push(
            "Your event must be available in at least one region."
          );
        }

        startNode.decisions.forEach(recurse);
        break;
      case "ChanceNode":
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
