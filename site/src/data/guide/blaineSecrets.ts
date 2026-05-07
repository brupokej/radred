import { getBox, type Box } from "@site/src/utils/box";
import type { Moment } from "@site/src/utils/moments";
import {
  cinnabarGymAceTrainerDerekBox,
  cinnabarGymAceTrainerLucyBox,
  cinnabarGymAceTrainerZacBox,
  cinnabarGymLeaderBlaineBox,
  cinnabarIslandMayBox,
  cinnabarLabLeaderJasmineBox,
  lavenderTownLeaderMortyBox,
  pokemonMansionBurglarLewisBox,
  seafoamIslandsLeaderPryceJynxBox,
  seafoamIslandsLeaderPryceSandslashABox,
} from "@site/src/utils/opponents";

export function getBlaineSecrets(_box1: Box) {
  const _secret = { name: "Secret", spriteKey: "secret" };
  const _box2 = getBox({ box: _box1, cap: 73 });

  const blaineBoxChange: Moment = {
    split: "Blaine",
    label: "Blaine Box Change",
    kind: "boxChange",
  };

  const seafoamIslandsEncounter: Moment = {
    split: "Blaine",
    label: "Seafoam Islands Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box2 },
  };

  const powerPlantEncounter: Moment = {
    split: "Blaine",
    label: "Power Plant Encounter",
    kind: "encounter",
    secret: true,
    data: { pokemon: _secret, playerBox: _box2 },
  };

  const powerPlantBoxChange: Moment = {
    split: "Blaine",
    label: "Power Plant Box Change",
    kind: "boxChange",
  };

  const _box3 = getBox({
    box: _box2,
    team: ["Secret", "Secret", "Secret"],
  });

  const lavenderTownLeaderMortyBattle: Moment = {
    split: "Blaine",
    label: "Lavender Town Leader Morty Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box3,
      opponentBox: lavenderTownLeaderMortyBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Krookodile"],
              turns: [
                [
                  { opponent: "{o:Krookodile} Stealth Rock" },
                  { player: "{p:Secret} U-Turn {o:Krookodile} to {-:243}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{p:Secret} Stealth Rock to {=:92}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const _box4 = getBox({
    box: _box3,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const seafoamIslandsLeaderPryceBattle: Moment = {
    split: "Blaine",
    label: "Seafoam Islands Leader Pryce Battle",
    kind: "switchBattle",
    secret: true,
    data: {
      cases: [
        {
          label: "50% → Jynx matchup",
          data: {
            playerBox: _box4,
            opponentBox: seafoamIslandsLeaderPryceJynxBox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Jynx"],
                    turns: [
                      [
                        { player: "{p:Secret} Fake Out {o:Jynx} to {-:199}" },
                        { opponent: "{o:Jynx} flinched" },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: "50% → Sandslash-A matchup",
          data: {
            playerBox: _box4,
            opponentBox: seafoamIslandsLeaderPryceSandslashABox,
            lines: [
              {
                matchups: [
                  {
                    matchup: ["Sandslash-A"],
                    turns: [
                      [
                        { player: "{p:Secret} Fake Out {o:Sandslash-A} to {-:214}" },
                        { opponent: "{o:Sandslash-A} flinched" },
                      ],
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  };

  const seafoamIslandsLeaderPryceBoxChange: Moment = {
    split: "Blaine",
    label: "Seafoam Islands Leader Pryce Box Change",
    kind: "boxChange",
  };

  const cinnabarLabLeaderJasmineBattle: Moment = {
    split: "Blaine",
    label: "Cinnabar Lab Leader Jasmine Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box4,
      opponentBox: cinnabarLabLeaderJasmineBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Gliscor"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Gliscor} to {=:0}" },
                  { opponent: "{o:Gliscor} fainted" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const cinnabarLabLeaderJasmineBoxChange: Moment = {
    split: "Blaine",
    label: "Cinnabar Lab Leader Jasmine Box Change",
    kind: "boxChange",
  };

  const _box5 = getBox({
    box: _box4,
    team: ["Secret", "Secret", "Secret", "Secret"],
  });

  const cinnabarIslandMayBattle: Moment = {
    split: "Blaine",
    label: "Cinnabar Island May Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box5,
      opponentBox: cinnabarIslandMayBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Aggron"],
              turns: [
                [
                  { player: "{p:Secret} Fake Out {o:Aggron} to {-:206}" },
                  { opponent: "{o:Aggron} flinched" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const cinnabarIslandMayBoxChange: Moment = {
    split: "Blaine",
    label: "Cinnabar Island May Box Change",
    kind: "boxChange",
  };

  const _box6 = getBox({
    box: _box5,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const pokemonMansionBurglarLewisBattle: Moment = {
    split: "Blaine",
    label: "Pokémon Mansion Burglar Lewis Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box6,
      opponentBox: pokemonMansionBurglarLewisBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Rillaboom", "Arcanine"],
              turns: [
                [
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                  { opponent: "{o:Rillaboom} Fake Out {p:Secret} to {+:1}" },
                  { opponent: "{o:Arcanine} Will-O-Wisp {p:Secret}" },
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
    cap: 76,
  });

  const pokemonMansionBurglarLewisBoxChange: Moment = {
    split: "Blaine",
    label: "Pokémon Mansion Burglar Lewis Box Change",
    kind: "boxChange",
  };

  const _box8 = getBox({
    box: _box7,
    team: ["Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const cinnabarGymAceTrainerDerekBattle: Moment = {
    split: "Blaine",
    label: "Cinnabar Gym Ace Trainer Derek Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box8,
      opponentBox: cinnabarGymAceTrainerDerekBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Zapdos-G"],
              turns: [
                [
                  { player: "{p:Secret} Tackle {o:Zapdos-G} to {=:0}" },
                  { opponent: "{o:Zapdos-G} fainted" },
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
    team: ["Secret", "Secret"],
  });

  const cinnabarGymAceTrainerLucyBattle: Moment = {
    split: "Blaine",
    label: "Cinnabar Gym Ace Trainer Lucy Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box9,
      opponentBox: cinnabarGymAceTrainerLucyBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Lycanroc"],
              turns: [
                [
                  { player: "{p:Secret} Fake Out {o:Lycanroc} to {-:222}" },
                  { opponent: "{p:Secret} Life Orb to {=:99}" },
                  { opponent: "{o:Lycanroc} flinched" },
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
    team: ["Secret", "Secret", "Secret", "Secret"],
  });

  const cinnabarGymAceTrainerZacBattle: Moment = {
    split: "Blaine",
    label: "Cinnabar Gym Ace Trainer Zac Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box10,
      opponentBox: cinnabarGymAceTrainerZacBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Salamence-Mega", "Cinderace"],
              turns: [
                [
                  { opponent: "{o:Salamence-Mega} mega evolve" },
                  { player: "{p:Secret} Fake Out {o:Cinderace} to {-:230}" },
                  { opponent: "{o:Cinderace} flinched" },
                  { player: "{p:Secret} Tackle {o:Salamence-Mega} to {=:0}" },
                  { opponent: "{o:Salamence-Mega} fainted" },
                  { player: "{p:Secret} transform" },
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
    team: ["Secret", "Secret", "Secret", "Secret", "Secret", "Secret"],
  });

  const cinnabarGymLeaderBlaineBattle: Moment = {
    split: "Blaine",
    label: "Cinnabar Gym Leader Blaine Battle",
    kind: "battle",
    secret: true,
    data: {
      playerBox: _box11,
      opponentBox: cinnabarGymLeaderBlaineBox,
      lines: [
        {
          matchups: [
            {
              matchup: ["Sandy Shocks"],
              turns: [
                [
                  { opponent: "{o:Sandy Shocks} Earth Power {p:Secret} to {+:1}" },
                  { player: "{p:Secret} U-Turn {o:Sandy Shocks} to {-:237}" },
                  { player: "{p:Secret} switch to {p:Secret}" },
                ],
              ],
            },
          ],
        },
      ],
    },
  };

  const cinnabarGymLeaderBlaineBoxChange: Moment = {
    split: "Blaine",
    label: "Cinnabar Gym Leader Blaine Box Change",
    kind: "boxChange",
  };

  return {
    blaineBoxChange,
    seafoamIslandsEncounter,
    powerPlantEncounter,
    powerPlantBoxChange,
    lavenderTownLeaderMortyBattle,
    seafoamIslandsLeaderPryceBattle,
    seafoamIslandsLeaderPryceBoxChange,
    cinnabarLabLeaderJasmineBattle,
    cinnabarLabLeaderJasmineBoxChange,
    cinnabarIslandMayBattle,
    cinnabarIslandMayBoxChange,
    pokemonMansionBurglarLewisBattle,
    pokemonMansionBurglarLewisBoxChange,
    cinnabarGymAceTrainerDerekBattle,
    cinnabarGymAceTrainerLucyBattle,
    cinnabarGymAceTrainerZacBattle,
    cinnabarGymLeaderBlaineBattle,
    cinnabarGymLeaderBlaineBoxChange,
    box: _box11,
  };
}
