import Head from "@docusaurus/Head";
import { OverlayFour } from "@site/src/components/Overlay";

export default function OverlayFourRaw() {
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; }`}</style>
      </Head>
      <OverlayFour />
    </>
  );
}
