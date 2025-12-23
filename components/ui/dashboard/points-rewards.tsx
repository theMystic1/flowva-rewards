import { useState, useRef, useEffect, useCallback } from "react";
import Points from "./points";
import { slides } from "constants/constant";

export default function PointRewards() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs to tab elements and the list container
  const tabRefs = useRef<HTMLButtonElement[]>([]);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Ink bar geometry
  const [ink, setInk] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Callback ref to register each tab
  const setTabRef = useCallback((el: HTMLButtonElement | null, i: number) => {
    if (el) tabRefs.current[i] = el;
  }, []);

  // Measure and set ink bar to match active tab
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

  return (
    <section className="overflow-x-hidden mt-24">
      <div className="ant-tabs ant-tabs-top">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="ant-tabs-nav"
        >
          <div className="ant-tabs-nav-wrap">
            <div className="ant-tabs-nav-list relative" ref={listRef}>
              {slides.map((sl, i) => {
                const active = i === activeIndex;
                return (
                  <button
                    key={sl}
                    ref={(el) => setTabRef(el, i)}
                    role="tab"
                    aria-selected={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className={`ant-tabs-tab ${active ? "ant-tabs-tab-active" : ""}`}
                  >
                    <span className="ant-tabs-tab-btn">{sl}</span>
                  </button>
                );
              })}
              <div
                className="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: ink.left,
                  width: ink.width,
                  height: "2.5px",
                  transition: "left .3s ease, width .3s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* panel */}
        <div className="pt-6">
          {activeIndex === 0 ? <Points /> : null}
          {activeIndex === 1 ? <div>/* Redeem rewards */</div> : null}
        </div>
      </div>
    </section>
  );
}
