// scripts/cfruFlags.ts
//
// Preprocessor flag values for the Radical Red CFRU build.
//
//   true  = symbol IS defined   → #ifdef SYMBOL takes the if-branch
//   false = symbol NOT defined  → #ifdef SYMBOL takes the #else branch (if any)
//
// Symbols not listed here are treated as defined (true) so unknown flags remain
// safe to parse. Add a symbol here (set to false) to suppress its if-branch.
//
// Used by: scripts/cfruMoves.mts

export const CFRU_FLAGS: Record<string, boolean> = {
  UNBOUND: false,
  GEN_6_POWER_NERFS: true,
  BUFFED_LEECH_LIFE: true,
  GEN_7_POWER_NERFS: true,
  DARK_VOID_ACC_NERF: false,
  ACTUAL_PLA_MOVE_POWERS: true,
  FROSTBITE: true,
};
