export type matchType = {
  data: [
    {
      is_available: boolean;
      metadata: {
        map: string;
        game_version: string;
        game_length: number;
        game_start: string;
        game_start_patched: string;
        rounds_played: number;
        mode: string;
        queue: string;
        season_id: string;
        platform: string;
        matchid: string;
        region: string;
        cluster: string;
      };
      players: {
        all_players: [
          {
            puuid: string;
            name: string;
            tag: string;
            team: string;
            level: number;
            character: string;
            currenttier: string;
            currenttier_patched: string;
            player_card: string;
            player_title: string;
            party_id: string;
            session_playtime: {
              minutes: number;
              seconds: number;
              milliseconds: number;
            };
            behavior: {
              afk_rounds: number;
              friendly_fire: {
                incoming: number;
                outgoing: number;
              };
              rounds_in_spawn: number;
            };
            platform: {
              type: string;
              os: {
                name: string;
                version: string;
              };
            };
            ability_casts: {
              c_cast: number;
              q_cast: number;
              e_cast: number;
              x_cast: number;
            };
            assets: {
              card: {
                small: string;
                large: string;
                wide: string;
              };
              agent: {
                small: string;
                bust: string;
                full: string;
                killfeed: string;
              };
            };
            stats: {
              score: number;
              kills: number;
              deaths: number;
              assists: number;
              bodyshots: number;
              headshots: number;
              legshots: number;
            };
            economy: {
              spent: {
                overall: number;
                average: number;
              };
              loadout_value: {
                overall: number;
                average: number;
              };
            };
            damage_made: number;
            damage_received: number;
          }
        ];
      };
    }
  ];
};
