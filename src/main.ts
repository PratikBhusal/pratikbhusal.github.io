import type { Alpine as AlpineType } from "alpinejs";
import Alpine from "alpinejs";

import "./style.css";

type SwipeDirection = "left" | "right";

interface NavigationData {
  open: boolean;
  toggle(): void;
}

interface ThemeData {
  dark: boolean;
  toggle(): void;
}

Alpine.directive(
  "swipe",
  (
    el: AlpineType.ElementWithXAttributes,
    { modifiers, expression }: AlpineType.DirectiveData,
    { evaluate }: AlpineType.DirectiveUtilities,
  ): void => {
    let startX: number = 0;
    let startY: number = 0;
    let startTime: number = 0;
    const threshold: number = 50;
    const restraint: number = 100;
    const maxTime: number = 300;

    el.addEventListener("pointerdown", (e: PointerEvent): void => {
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
    });

    el.addEventListener("pointerup", (e: PointerEvent): void => {
      const distX: number = e.clientX - startX;
      const distY: number = e.clientY - startY;
      const elapsed: number = Date.now() - startTime;

      if (elapsed > maxTime) return;
      if (Math.abs(distX) < threshold || Math.abs(distY) > restraint) return;

      const direction: SwipeDirection = distX > 0 ? "right" : "left";
      if (modifiers.includes(direction)) evaluate(expression);
    });
  },
);

Alpine.data(
  "navigation",
  (): AlpineType.AlpineComponent<NavigationData> => ({
    open: false,

    toggle(): void {
      this.open = !this.open;
    },

    init(): void {
      let resizeTimer: ReturnType<typeof setTimeout>;
      window.addEventListener("resize", (): void => {
        // Suppress transitions on the nav and its children during resize to
        // prevent the sidebar-close animation from flashing when crossing the
        // mobile/desktop breakpoint. CSS media query changes trigger before the
        // resize event, so we debounce the removal to keep transitions disabled
        // for the entire resize drag.
        const nav: HTMLElement = this.$el;
        nav.classList.add("!transition-none", "*:!transition-none");
        if (window.innerWidth >= 768) this.open = false;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(
          (): void => nav.classList.remove("!transition-none", "*:!transition-none"),
          100,
        );
      });
    },
  }),
);

Alpine.data(
  "theme",
  (): AlpineType.AlpineComponent<ThemeData> => ({
    dark:
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches),

    init(): void {
      this.$watch("dark", (val: boolean): void => {
        document.documentElement.classList.toggle("dark", val);
        localStorage.setItem("theme", val ? "dark" : "light");
      });
      document.documentElement.classList.toggle("dark", this.dark);
    },

    toggle(): void {
      this.dark = !this.dark;
    },
  }),
);

Alpine.start();
