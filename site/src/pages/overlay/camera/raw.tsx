import Head from "@docusaurus/Head";
import { OverlayCamera } from "@site/src/components/Overlay";

export default function OverlayCameraRaw() {
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; }`}</style>
      </Head>
      <OverlayCamera />
    </>
  );
}
