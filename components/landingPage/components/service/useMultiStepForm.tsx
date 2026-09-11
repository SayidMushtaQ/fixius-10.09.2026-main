"use client";
import { useAuth } from "@/context/AuthContext";
import { ReactElement, useState } from "react";

export function useMultiStepForm(steps: ReactElement[]) {
  const { userData } = useAuth();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }
  function back() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }
  // useEffect(() => {
  // 	setIsLastStep(currentStepIndex === steps.length - 1);
  // }, [currentStepIndex]);
  // useEffect(() => {
  // 	setIsLastStep(userData.length && currentStepIndex === 4 ? true : false);
  // }, [currentStepIndex, userData.length]);
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    next,
    back,
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep,
    setIsLastStep,
    goTo: setCurrentStepIndex,
  };
}
