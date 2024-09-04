import React, { useState } from "react";

export const multiStepForm = (steps: Array<React.ReactElement>) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const next = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => {
        return ++prev;
      });
      return;
    }
    return;
  };
  const previous = () => {
    if (currentStepIndex >= 1) {
      setCurrentStepIndex((prev) => {
        return --prev;
      });
      return;
    }
    return;
  };
  const goto = (stepNumber: number) => {
    setCurrentStepIndex(stepNumber - 1);
    return;
  };
  const canMoveForward = currentStepIndex < steps.length - 1;
  const canMoveBackward = currentStepIndex >= 1;

  return {
    next,
    previous,
    goto,
    currentStepIndex,
    canMoveForward,
    canMoveBackward,
    steps,
  };
};
