import HighlightLevelToggle from "@site/src/theme/NavbarItem/HighlightLevelToggle";
import NavbarColorModeToggleOriginal from "@theme-original/Navbar/ColorModeToggle";
import type { ComponentProps } from "react";
import styles from "./styles.module.css";

type Props = ComponentProps<typeof NavbarColorModeToggleOriginal>;

export default function NavbarColorModeToggle({ className }: Props): JSX.Element {
  return (
    <div className={`${styles.group} ${className ?? ""}`}>
      <HighlightLevelToggle />
      <NavbarColorModeToggleOriginal />
    </div>
  );
}
