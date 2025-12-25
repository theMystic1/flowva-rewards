import { useCallback, useEffect, useRef, useState } from "react";

export const useSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  const [ink, setInk] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const setTabRef = useCallback((el: HTMLButtonElement | null, i: number) => {
    if (el) tabRefs.current[i] = el;
  }, []);

  const measure = useCallback(() => {
    const listEl = listRef.current;
    const tabEl = tabRefs.current[activeIndex];
    if (!listEl || !tabEl) return;

    const listRect = listEl.getBoundingClientRect();
    const tabRect = tabEl.getBoundingClientRect();

    setInk({
      left: tabRect.left - listRect.left + listEl.scrollLeft,
      width: tabRect.width,
    });
  }, [activeIndex]);

  useEffect(() => {
    measure();
    const rId = requestAnimationFrame(measure);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rId);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  return {
    activeIndex,
    setActiveIndex,
    setTabRef,
    ink,
    setInk,
    listRef,
  };
};
