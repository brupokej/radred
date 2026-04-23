import Head from "@docusaurus/Head";
import { OverlayTitle } from "@site/src/components/Overlay";

export default function OverlayTitleRaw() {
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; }`}</style>
      </Head>
      <OverlayTitle />
    </>
  );
}
