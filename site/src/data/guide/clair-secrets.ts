import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  ceruleanCaveArcherBox,
  ceruleanCaveArianaBox,
  ceruleanCaveGiovanniBox,
  ceruleanCaveGrunt1Box,
  ceruleanCaveGrunt2Box,
  championLanceBox,
} from "@site/src/utils/opponents";

export function getClairSecrets(_box1: Box) {
  const _secret = { name: "Secret", spriteKey: "secret" };
  const _box2 = getBox({ box: _box1, cap: 79 });

  const clairBoxChange: Moment = {
    split: "Clair",
    label: "Clair Box Change",
    kind: "boxChange",
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const ceruleanCaveGrunt1Battle: Moment = {
    split: "Clair",
    label: "Cerulean Cave Grunt 1 Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box3,
      opponentBox: ceruleanCaveGrunt1Box,
      lines: [
        {
          matchups: [
            {
              matchup: ["Glimmora"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Glimmora} to {-:237}" },
                  { opponent: "{p:Secret} Life Orb to {=:102}" },
                  { opponent: "{o:Glimmora} Stealth Rock" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const ceruleanCaveGrunt1BoxChange: Moment = {
    split: "Clair",
    label: "Cerulean Cave Grunt 1 Box Change",
    kind: "boxChange",
  };

  const _box4 = getBox({
    box: _box3,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const ceruleanCaveGrunt2Battle: Moment = {
    split: "Clair",
    label: "Cerulean Cave Grunt 2 Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box4,
      opponentBox: ceruleanCaveGrunt2Box,
      lines: [
        {
          matchups: [
            {
              matchup: ["Grimmsnarl"],
              turns: [
                [
                  { opponent: "{o:Grimmsnarl} Light Screen" },
                  { player: "{p:Secret} U-Turn {o:Grimmsnarl} to {-:262}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box5 = getBox({
    box: _box4,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const ceruleanCaveArcherBattle: Moment = {
    split: "Clair",
    label: "Cerulean Cave Archer Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box5,
      opponentBox: ceruleanCaveArcherBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Ninetales"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Ninetales} to {=:0}" },
                  { opponent: "{o:Ninetales} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const ceruleanCaveArianaBattle: Moment = {
    split: "Clair",
    label: "Cerulean Cave Ariana Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box5,
      opponentBox: ceruleanCaveArianaBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Wailord"],
              turns: [
                [
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{o:Wailord} Bouncy Bubble {p:Secret}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const ceruleanCaveArianaBoxChange: Moment = {
    split: "Clair",
    label: "Cerulean Cave Ariana Box Change",
    kind: "boxChange",
  };

  const _box6 = getBox({
    box: _box5,
    team: ["Secret", "Secret", "Secret"],
  });

  const ceruleanCaveGiovanniBattle: Moment = {
    split: "Clair",
    label: "Cerulean Cave Giovanni Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box6,
      opponentBox: ceruleanCaveGiovanniBox,
      partnerBox: championLanceBox,
      lines: [],
    },
  };

  return {
    clairBoxChange,
    ceruleanCaveGrunt1Battle,
    ceruleanCaveGrunt1BoxChange,
    ceruleanCaveGrunt2Battle,
    ceruleanCaveArcherBattle,
    ceruleanCaveArianaBattle,
    ceruleanCaveArianaBoxChange,
    ceruleanCaveGiovanniBattle,
    box: _box6,
  };
}
