import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";
import "nightlight";
import HeatDistortionProgram from "./distortion";

const svg = `
  <g fill="#f79e98">
    <rect x="25%" y="157" width="45%" height="120" transform="rotate(-20)" />
    <circle cx="50%" cy="400" r="140" />
    <rect x="150" y="460" width="65%" height="80" transform="rotate(25 20 700)" />
    <circle cx="42%" cy="960" r="92" />
  </g>
`;

barba.use(barbaPrefetch);
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        document.documentElement.classList.add("bg-black");

        this.$canvas = document.querySelector(
          ".js-heatDistortion"
        ) as HTMLCanvasElement;
        this.timeoutId = null;
        this.program = new HeatDistortionProgram(this.$canvas, svg);

        const mq = window.matchMedia("(min-width: 700px)");
        this.handleMediaChange = (e: MediaQueryListEvent) => {
          if (this.toggleProgram) {
            this.toggleProgram(e.matches);
          }
        };
        this.toggleProgram = (active: boolean) => {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
          }
          if (active) {
            this.program.start();
            this.timeoutId = setTimeout(() => {
              this.$canvas.classList.remove("opacity-0");
            }, 200);
          } else {
            this.$canvas.classList.add("opacity-0");
            this.timeoutId = setTimeout(() => {
              this.program.stop();
            }, 500);
          }
        };
        mq.addEventListener("change", this.handleMediaChange);

        this.program.setup().then(() => {
          this.toggleProgram(mq.matches);
        });
      },
      beforeLeave() {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
        document.documentElement.classList.remove("bg-black");
      },
      afterLeave() {
        if (this.program) {
          this.program.destroy();
          this.program = null;
        }
      },
    },
  ],
});

type CountVars = {
  path?: string; // Page path (without domain) or event name.
  referrer?: string; // Where the user came from; can be an URL (https://example.com) or any string (June Newsletter). Default is to use the Referer header.
  title?: string; // Human-readable title. Default is document.title.
  event?: boolean; // Treat the path as an event, rather than a URL. Boolean.
};

declare global {
  interface Window {
    goatcounter: {
      no_onload: boolean; // Don’t do anything on page load. If you want to call count() manually.
      allow_local?: boolean; // Allow requests from local addresses (localhost, 192.168.0.0, etc.) for testing the integration locally.
      count?: (count_vars: CountVars) => void;
      referrer?: string;
      get_query?: (parameter: string) => string;
    };
  }
}

barba.hooks.enter(onVisit);

function onVisit() {
  if (!window.goatcounter) {
    return;
  }
  const path = cleanPath();
  const referrer =
    window.goatcounter.get_query?.("ref") ||
    window.goatcounter.get_query?.("utm_source") ||
    document.referrer;

  window.goatcounter.count({ path, referrer });
}

function cleanPath() {
  const l = document.location;
  const p = l.pathname;
  const s = l.search
    .substring(1)
    .split("&")
    .filter((x) => !/^(utm_.*=|ref=)/.test(x))
    .join("&");
  return p + (s.length ? "?" + s : "") + l.hash;
}

history.scrollRestoration = "manual";

let scrollPosY = 0;

barba.hooks.beforeEnter((data) => {
  if (data.trigger !== "back") {
    scrollPosY = barba.history.current.scroll.y;
  }
});

barba.hooks.afterLeave((data) => {
  const targetScroll = data.trigger !== "back" ? 0 : scrollPosY;
  window.scrollTo(0, targetScroll);
});
