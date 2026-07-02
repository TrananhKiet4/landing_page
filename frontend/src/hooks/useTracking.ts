import { useEffect, useRef } from "react";
import { sendTracking } from "../lib/api";

const scrollMilestones = [25, 50, 75, 100];

function getViewportLabel() {
  if (window.innerWidth < 768) {
    return "mobile";
  }

  if (window.innerWidth < 1280) {
    return "tablet";
  }

  return "desktop";
}

export function useTracking() {
  const firedMilestones = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const documentElement = document.documentElement;
      const scrollableHeight = documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const progress = (window.scrollY / scrollableHeight) * 100;

      for (const milestone of scrollMilestones) {
        if (progress < milestone || firedMilestones.current.has(milestone)) {
          continue;
        }

        firedMilestones.current.add(milestone);
        void sendTracking({
          eventType: "scroll_milestone",
          label: String(milestone) + "%",
          location: "landing-page",
          path: window.location.pathname,
          metadata: {
            milestone,
            viewport: getViewportLabel()
          }
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const trackCta = (
    label: string,
    location: string,
    metadata?: Record<string, string | number | boolean | null>
  ) => {
    void sendTracking({
      eventType: "cta_click",
      label,
      location,
      path: window.location.pathname,
      metadata: {
        viewport: getViewportLabel(),
        ...(metadata ?? {})
      }
    });
  };

  return { trackCta };
}
