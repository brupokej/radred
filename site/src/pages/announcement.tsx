import Head from "@docusaurus/Head";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { ReactNode } from "react";

const BADGE_NAMES = [
  "boulder",
  "cascade",
  "thunder",
  "rainbow",
  "soul",
  "marsh",
  "volcano",
  "rising",
];

const OUTLINE_FILTER = (
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
);

const SHADOW_AFTER = `
  content: "";
  position: absolute;
  top: -4px;
  left: -8px;
  right: -4px;
  bottom: -8px;
  border-left: 4px solid #68ad9a;
  border-bottom: 4px solid #41848a;
  clip-path: polygon(
    4px 0,
    4px calc(100% - 4px),
    100% calc(100% - 4px),
    calc(100% - 4px) 100%,
    0 100%,
    0 4px
  );
  pointer-events: none;
`;

const css = `
  @font-face {
    font-family: "Open Sans Bold";
    src: url("/fonts/OpenSans-Bold.ttf") format("truetype");
  }
  @font-face {
    font-family: "Hind";
    font-weight: bold;
    src: url("/fonts/Hind-Bold.ttf") format("truetype");
  }
  @font-face {
    font-family: "Hind";
    font-weight: normal;
    src: url("/fonts/Hind-Regular.ttf") format("truetype");
  }

  .poster {
    width: 802px;
    height: 376px;
    background: #cad6d6;
    display: flex;
    flex-direction: column;
    font-family: "Open Sans Bold", sans-serif;
    overflow: hidden;
  }

  .poster-shadow {
    filter: url(#outline);
  }

  /* Grid: left col = titles (row 1) + badges (row 2), right col = bulbasaur spanning both */
  .poster-body {
    flex: 1;
    display: grid;
    grid-template-columns: 486px auto;
    grid-template-rows: 120px 128px;
    column-gap: 20px;
    row-gap: 16px;
    padding: 16px;
    width: 802px;
  }

  /* Titles: left col, row 1 only */
  .poster-titles {
    grid-column: 1;
    grid-row: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }

  .poster-title-1 {
    margin-top: 16px;
    font-size: 36px;
    color: #41848a;
    line-height: 1;
  }

  .poster-title-2 {
    font-family: "Hind", sans-serif;
    font-weight: normal;
    font-size: 22px;
    color: #41848a;
    line-height: 1;
    margin-top: 8px;
  }

  /* Left panel: left col, row 2 — grid sizes it to 486px × 128px */
  .poster-left-panel {
    grid-column: 1;
    grid-row: 2;
    background: #424242;
    border: 4px solid #fffffd;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .poster-left-panel::after { ${SHADOW_AFTER} }

  /* Image panel: right col, spans both rows (120 + 16 + 128 = 264px) */
  .poster-image-panel {
    grid-column: 2;
    grid-row: 1 / 3;
    width: 264px;
    height: 264px;
    box-sizing: border-box;
    background: #424242;
    border: 4px solid #fffffd;
    position: relative;
  }

  .poster-image-panel::after { ${SHADOW_AFTER} }

  .poster-image-panel img {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Badge row (matches overlay badgesRow sizing) */
  .poster-badges {
    height: 84px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    flex-shrink: 0;
  }

  /* Panel inner title — fills remaining 36px after 84px badge row */
  .poster-panel-title {
    font-family: "Hind", sans-serif;
    font-weight: bold;
    font-size: 26px;
    height: 26px;
    color: #fffffd;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    flex-shrink: 0;
  }

  /* Bottom banner: top gap equals column-gap (20px) between the two frame panels */
  .poster-banner {
    font-size: 33px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    padding-top: 4px;
    color: #fffffd;
    width: 802px;
  }

  .poster-banner-section {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
`;

export default function Announcement(): ReactNode {
  const imgBase = useBaseUrl("/img/");
  const squareSrc = useBaseUrl("/img/brupokej-square.png");
  const barSrc = useBaseUrl("/img/bar.png");

  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { margin: 0; padding: 0; background: #cad6d6 !important; }`}</style>
        <style>{css}</style>
      </Head>
      {OUTLINE_FILTER}
      <div className="poster">
        <div className="poster-body">
          <div className="poster-titles">
            <div className="poster-title-1">RR 4.1 HC 1DR STREAM</div>
            <div className="poster-title-2">
              brupokej.github.io/radred
              <svg
                viewBox="0 0 24 24"
                width={16}
                height={16}
                fill="currentColor"
                aria-hidden
                style={{ marginLeft: "8px", verticalAlign: "top" }}
              >
                <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
              </svg>
            </div>
          </div>

          <div className="poster-left-panel">
            <div className="poster-badges">
              {BADGE_NAMES.map((name) => (
                <img key={name} src={`${imgBase}${name}.png`} alt={name} width={54} />
              ))}
            </div>
            <div className="poster-panel-title">+ Riskless Elite Four</div>
          </div>
          <div className="poster-image-panel">
            <img src={squareSrc} alt="" />
          </div>
        </div>

        <div className="poster-banner">
          <div className="poster-banner-section">
            <svg
              className="poster-shadow"
              viewBox="0 0 24 24"
              width={30}
              height={30}
              fill="currentColor"
              aria-hidden
            >
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
            </svg>
            &nbsp;
            <span className="poster-shadow">@brupokej</span>
            &nbsp;&nbsp;
          </div>
          <div className="poster-banner-section">
            <img width={8} src={barSrc} alt="" />
            &nbsp;&nbsp;
            <span className="poster-shadow">Sunday, July 5th at 12:00 GMT</span>
          </div>
        </div>
      </div>
    </>
  );
}
