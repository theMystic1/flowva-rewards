import Points from "./points";
import { slides } from "constants/constant";
import RewardsSlide from "components/rewards/RewardSlide";
import { useSlider } from "hooks/useSlider";
import SideNav from "./sidenav";

export default function PointRewards() {
  const { activeIndex, ink, setTabRef, setActiveIndex, listRef } = useSlider();
  return (
    <section className="overflow-x-hidden mt-30 lg:mt-24">
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
          {activeIndex === 1 ? <RewardsSlide /> : null}
        </div>
      </div>
    </section>
  );
}
