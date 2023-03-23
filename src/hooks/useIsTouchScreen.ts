import { useEffect, useState } from "react"

const isTouchScreen = () => {
  if (navigator.maxTouchPoints > 0) {
    return true;
  }
  // if (navigator.msMaxTouchPoints > 0) {
  //   return true;
  // }
  if (window.matchMedia("(pointer:coarse)").matches) {
    return true;
  }
  if ("orientation" in window) {
    return true;
  }

  return false;
};

export const useIsTouchScreen = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(isTouchScreen());
  }, [])

  return {
    isTouchScreen: state,
  } as const
}
