import { useEffect } from "react";

export function round(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

export const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
