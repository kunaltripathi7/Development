import { useEffect } from "react";
import { useRef } from "react";

// give more generic names to reusable compos
export function useOutsideClick(handler, inCapturing = true) {
  // refs are used in where you need to access or manipulate an underlying DOM element or a component instance directly.
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      // handle event in capture phase cuz modal window attaches to dom in body when event bubbles it finds click outside -> instantly close
      document.addEventListener("click", handleClick, inCapturing);
      // cleanup func. runs on compo unmount & if useEffect reruns
      return () =>
        document.removeEventListener("click", handleClick, inCapturing);
    },
    [inCapturing, handler]
  );
  return ref;
}
