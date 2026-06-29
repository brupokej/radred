import { Moment } from "@site/src/utils/moments";

export type RelayState = {
  moment: Moment;
  switchBattleState?: string;
};

export const RELAY_HTTP = "http://localhost:3001";
export const RELAY_WS = "ws://localhost:3001";

export async function postRelayState(update: Partial<RelayState>): Promise<void> {
  await fetch(`${RELAY_HTTP}/state`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
}
