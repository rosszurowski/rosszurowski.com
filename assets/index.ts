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
