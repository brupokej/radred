import Head from "@docusaurus/Head";
import OverlayOne from "@site/src/components/Overlay";

export default function OverlayOneRaw() {
  return (
    <>
      <Head>
        <style>{`html, body, #__docusaurus { background: transparent !important; margin: 0; padding: 0; }`}</style>
      </Head>
      <OverlayOne />
    </>
  );
}
