import Head from "@docusaurus/Head";
import { OverlayBanner } from "@site/src/components/Overlay";

export default function OverlayBannerRaw() {
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; }`}</style>
      </Head>
      <OverlayBanner />
    </>
  );
}
