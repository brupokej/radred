import Head from "@docusaurus/Head";
import { OverlayBackground } from "@site/src/components/Overlay";

export default function OverlayBackgroundRaw() {
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; }`}</style>
      </Head>
      <OverlayBackground />
    </>
  );
}
