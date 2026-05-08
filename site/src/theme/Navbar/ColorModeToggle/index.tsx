import HighlightLevelToggle from "@site/src/theme/NavbarItem/HighlightLevelToggle";
import HpDisplayToggle from "@site/src/theme/NavbarItem/HpDisplayToggle";
import StreamModeToggle from "@site/src/theme/NavbarItem/StreamModeToggle";
import NavbarColorModeToggleOriginal from "@theme-original/Navbar/ColorModeToggle";
import type { ComponentProps, JSX } from "react";
import styles from "./styles.module.css";

type Props = ComponentProps<typeof NavbarColorModeToggleOriginal>;

export default function NavbarColorModeToggle({ className }: Props): JSX.Element {
  return (
    <div className={`${styles.group} ${className ?? ""}`}>
      <HighlightLevelToggle />
      <HpDisplayToggle />
      <StreamModeToggle />
      <NavbarColorModeToggleOriginal />
    </div>
  );
}
