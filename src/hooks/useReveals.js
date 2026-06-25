import { useEffect } from "react";

export function useReveals() {
  useEffect(() => {
    const observed = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );

    const observeRevealNodes = (root = document) => {
      root.querySelectorAll?.("[data-reveal]").forEach((node) => {
        if (observed.has(node)) return;
        observed.add(node);
        observer.observe(node);
      });
    };

    observeRevealNodes();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches("[data-reveal]")) {
            if (!observed.has(node)) {
              observed.add(node);
              observer.observe(node);
            }
          }
          observeRevealNodes(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
