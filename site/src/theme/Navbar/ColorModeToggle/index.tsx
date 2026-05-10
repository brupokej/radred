import HighlightLevelToggle from "@site/src/theme/NavbarItem/HighlightLevelToggle";
import HpDisplayToggle from "@site/src/theme/NavbarItem/HpDisplayToggle";
import CombinedColorModeToggle from "@site/src/theme/NavbarItem/CombinedColorModeToggle";
import NavbarColorModeToggleOriginal from "@theme-original/Navbar/ColorModeToggle";
import type { ComponentProps, JSX } from "react";
import styles from "./styles.module.css";

type Props = ComponentProps<typeof NavbarColorModeToggleOriginal>;

export default function NavbarColorModeToggle({ className }: Props): JSX.Element {
  return (
    <div className={`${styles.group} ${className ?? ""}`}>
      <HighlightLevelToggle />
      <HpDisplayToggle />
      <CombinedColorModeToggle />
    </div>
  );
}
