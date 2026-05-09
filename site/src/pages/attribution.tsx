import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { ReactNode } from "react";

const css = `
  @font-face {
    font-family: "Open Sans Bold";
    src: url("/fonts/OpenSans-Bold.ttf") format("truetype");
  }

  .mockup-body {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    padding: 8px 16px;
    margin: 0;
  }

  .mockup-body img {
    height: 68px;
    width: 68px;
    object-fit: contain;
  }

  .mockup-banner-text {
    font-family: "Open Sans Bold", sans-serif;
    font-size: 27px;
    color: #fffffd;
    filter: url(#outline);
    white-space: nowrap;
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .mockup-banner-feat {
    font-size: 22px;
  }
`;

export default function AttributionMockup(): ReactNode {
  const imgSrc = useBaseUrl("/img/logo.svg");
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { margin: 0; padding: 0; background: #cad6d6 !important; width: fit-content; }`}</style>
        <style>{css}</style>
      </Head>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="outline" x="-5%" y="-5%" width="110%" height="110%">
            <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="0.875" />
            <feFlood floodColor="#424242" result="color" />
            <feComposite in="color" in2="expanded" operator="in" result="outline" />
            <feMerge>
              <feMergeNode in="outline" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div className="mockup-body">
        <img src={imgSrc} alt="brupokej" />
        <span className="mockup-banner-text">
          <span className="mockup-banner-feat">feat.</span>
          <span>@brupokej</span>
        </span>
      </div>
    </>
  );
}
