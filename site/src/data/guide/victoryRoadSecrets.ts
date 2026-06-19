import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  indigoPlateauCreatorSoupercellBox,
  route22RivalRematchBox,
  route23BrendanBox,
  victoryRoadAceTrainerAlexaBox,
  victoryRoadAceTrainerCarolineBox,
  victoryRoadAceTrainerColbyBox,
  victoryRoadAceTrainerGeorgeBox,
  victoryRoadAceTrainerNaomiBox,
  victoryRoadAceTrainerRolandoBox,
  victoryRoadCoolCoupleRayAndTyraBox,
} from "@site/src/utils/opponents";

export function getVictoryRoadSecrets(_box1: Box) {
  const _secret = { name: "Secret", spriteKey: "secret" };

  const route13Encounter: Moment = {
    split: "Victory Road",
    label: "Route 13 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box1 },
  };

  const route18Encounter: Moment = {
    split: "Victory Road",
    label: "Route 18 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box1 },
  };

  const route20Encounter: Moment = {
    split: "Victory Road",
    label: "Route 20 Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box1 },
  };

  const _box2 = getBox({ box: _box1, cap: 82 });

  const route20BoxChange: Moment = {
    split: "Victory Road",
    label: "Route 20 Box Change",
    kind: "boxChange",
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Secret", "Secret", "Secret", "Secret"],
  });

  const route22RivalRematchBattle: Moment = {
    split: "Victory Road",
    label: "Route 22 Rival Rematch Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box3,
      opponentBox: route22RivalRematchBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Zapdos"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Zapdos} to {=:0}" },
                  { opponent: "{o:Zapdos} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const route22RivalRematchBoxChange: Moment = {
    split: "Victory Road",
    label: "Route 22 Rival Rematch Box Change",
    kind: "boxChange",
  };

  const _box4 = getBox({
    box: _box3,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const route23BrendanBattle: Moment = {
    split: "Victory Road",
    label: "Route 23 Brendan Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box4,
      opponentBox: route23BrendanBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Tyrantrum"],
              turns: [
                [
                  { opponent: "{o:Tyrantrum} Close Combat {p:Secret} to {+:1}" },
                  { player: "{p:Secret} U-Turn {o:Tyrantrum} to {-:250}" },
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
    cap: 85,
  });

  const route23BrendanBoxChange: Moment = {
    split: "Victory Road",
    label: "Route 23 Brendan Box Change",
    kind: "boxChange",
  };

  const _box6 = getBox({
    box: _box5,
    team: ["Secret", "Secret", "Secret", "Secret"],
  });

  const victoryRoadAceTrainerNaomiBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Ace Trainer Naomi Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box6,
      opponentBox: victoryRoadAceTrainerNaomiBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Maushold"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Maushold} to {=:0}" },
                  { opponent: "{o:Maushold} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box7 = getBox({
    box: _box6,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const victoryRoadAceTrainerRolandoBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Ace Trainer Rolando Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box7,
      opponentBox: victoryRoadAceTrainerRolandoBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Cyclizar"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Cyclizar} to {=:0}" },
                  { opponent: "{p:Secret} Life Orb to {=:109}" },
                  { opponent: "{o:Cyclizar} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box8 = getBox({
    box: _box7,
    team: ["Secret", "Secret"],
  });

  const victoryRoadAceTrainerGeorgeBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Ace Trainer George Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box8,
      opponentBox: victoryRoadAceTrainerGeorgeBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Metagross"],
              turns: [
                [
                  { player: "{p:Secret} Fake Out {o:Metagross} to {-:256}" },
                  { opponent: "{o:Metagross} flinched" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box9 = getBox({
    box: _box8,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const victoryRoadAceTrainerCarolineBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Ace Trainer Caroline Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box9,
      opponentBox: victoryRoadAceTrainerCarolineBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Lopunny-Mega"],
              turns: [
                [
                  { opponent: "{o:Lopunny-Mega} mega evolve" },
                  { opponent: "{o:Lopunny-Mega} Fake Out {p:Secret} to {+:1}" },
                  { player: "{p:Secret} flinched" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box10 = getBox({
    box: _box9,
    team: ["Secret", "Secret", "Secret"],
  });

  const victoryRoadAceTrainerColbyBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Ace Trainer Colby Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box10,
      opponentBox: victoryRoadAceTrainerColbyBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Arcanine"],
              turns: [
                [
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{o:Arcanine} Will-O-Wisp {p:Secret}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box11 = getBox({
    box: _box10,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const victoryRoadAceTrainerAlexaBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Ace Trainer Alexa Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box11,
      opponentBox: victoryRoadAceTrainerAlexaBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Clefable"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Clefable} to {-:281}" },
                  { opponent: "{o:Clefable} Stealth Rock" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box12 = getBox({
    box: _box11,
    team: ["Secret", "Secret"],
  });

  const victoryRoadCoolCoupleRayAndTyraBattle: Moment = {
    split: "Victory Road",
    label: "Victory Road Cool Couple Ray & Tyra Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box12,
      opponentBox: victoryRoadCoolCoupleRayAndTyraBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Scrafty", "Darmanitan-Z"],
              turns: [
                [
                  {
                    player:
                      "{p:Secret} Rock Slide {o:Scrafty} to {-:230} and {o:Darmanitan-Z} to {-:298}",
                  },
                  { opponent: "{p:Secret} Life Orb to {=:109}" },
                  {
                    player:
                      "{p:Secret} Rock Slide {o:Scrafty} to {=:0} and {o:Darmanitan-Z} to {=:0}",
                  },
                  { opponent: "{o:Scrafty} fainted" },
                  { opponent: "{o:Darmanitan-Z} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box13 = getBox({
    box: _box12,
    team: ["Secret"],
  });

  const indigoPlateauCreatorSoupercellBattle: Moment = {
    split: "Victory Road",
    label: "Indigo Plateau Creator Soupercell Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box13,
      opponentBox: indigoPlateauCreatorSoupercellBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Gigalith"],
              turns: [
                [
                  { opponent: "{o:Gigalith} Explosion {p:Secret}" },
                  { opponent: "{o:Gigalith} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  return {
    route13Encounter,
    route18Encounter,
    route20Encounter,
    route20BoxChange,
    route22RivalRematchBattle,
    route22RivalRematchBoxChange,
    route23BrendanBattle,
    route23BrendanBoxChange,
    victoryRoadAceTrainerNaomiBattle,
    victoryRoadAceTrainerRolandoBattle,
    victoryRoadAceTrainerGeorgeBattle,
    victoryRoadAceTrainerCarolineBattle,
    victoryRoadAceTrainerColbyBattle,
    victoryRoadAceTrainerAlexaBattle,
    victoryRoadCoolCoupleRayAndTyraBattle,
    indigoPlateauCreatorSoupercellBattle,
    box: _box13,
  };
}
