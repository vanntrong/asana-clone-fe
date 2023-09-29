import { RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | Array<RefObject<T>>,
  handler: Handler,
  mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
  useEffect(() => {
    const handle = (event: MouseEvent) => {
      if (Array.isArray(ref)) {
        const isOutside = ref.every((r) => checkClickOutside(r, event));
        if (!isOutside) {
          return;
        }
      } else {
        if (!checkClickOutside(ref, event)) {
          return;
        }
      }
      handler(event);
    };

    window.addEventListener(mouseEvent, handle);

    return () => {
      window.removeEventListener(mouseEvent, handle);
    };
  }, [handler, ref, mouseEvent]);
}

const checkClickOutside = (ref: RefObject<HTMLElement>, event: MouseEvent) => {
  if (!ref.current || ref.current.contains(event.target as Node)) {
    return false;
  }
  return true;
};
