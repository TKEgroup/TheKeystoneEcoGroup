"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    MyJobQuoteWidget?: new () => {
      init: (options: {
        targetId: string;
        userId: string;
        numberOfReviews: number;
        widgetStyle: string;
        theme: string;
      }) => void;
    };
  }
}

export default function MyJobQuoteReviews() {
  useEffect(() => {
    let active = true;
    const target = document.getElementById("mjq-widget");
    if (!target) return;

    const initialise = () => {
      if (!active || !window.MyJobQuoteWidget) return;
      target.innerHTML = "";
      new window.MyJobQuoteWidget().init({
        targetId: "mjq-widget",
        userId: "usr_mm5kqiujcgvkkcmqcz6k209mxb2v",
        numberOfReviews: 10,
        widgetStyle: "single",
        theme: "light",
      });
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-mjq-widget="true"]');
    if (window.MyJobQuoteWidget) {
      initialise();
    } else if (existing) {
      existing.addEventListener("load", initialise);
    } else {
      const script = document.createElement("script");
      script.src = "https://www.myjobquote.co.uk/js/widget.js";
      script.async = true;
      script.dataset.mjqWidget = "true";
      script.addEventListener("load", initialise);
      document.body.appendChild(script);
    }

    return () => {
      active = false;
      const script = document.querySelector<HTMLScriptElement>('script[data-mjq-widget="true"]');
      script?.removeEventListener("load", initialise);
    };
  }, []);

  return (
    <section className="below-fold" id="customer-reviews" aria-label="Customer reviews">
      <span className="eyebrow">CUSTOMER FEEDBACK</span>
      <h2>What our customers say.</h2>
      <p>Read our latest customer reviews, independently collected through MyJobQuote.</p>
      <div id="mjq-widget" style={{ margin: "2rem auto 0", maxWidth: 900 }} />
    </section>
  );
}
