import axios from "axios";
import { Region } from "./types";
import { ErrorInterpreter, ResponseInterpreter } from "../utils/interpreter";
import Regions from "./utils/regions";

import { Account } from "./riot";
import { Content } from "./valorant/content";
import { Match } from "./valorant/match";
import { Ranked } from "./valorant/ranked";
import { Status } from "./valorant/status";

class API {
  public account = new Account(this);
  public content = new Content(this);
  public match = new Match(this);
  public status = new Status(this);
  public ranked = new Ranked(this);

  #accountRegion: Region;
  #key: string = "";
  #originalRegion: Region | null = null;
  #region: Region;

  /**
   * @constructor
   *
   * @param {Region} region Target Region: APAC | BR | EU | KR | LATAM | NA | PBE1
   * @param {string} key The API Key registered at https://developer.riotgames.com/
   * @param {Region} accountRegion Target Region for Account API: AMERICAS | ASIA | EUROPE
   * @return {this} the API instance
   */

  constructor(region: Region, key: string, accountRegion?: Region) {
    if (region === null) {
      throw new Error("No region is classified");
    }
    if (key.length === 0) {
      throw new Error("No key is classified");
    }

    if (accountRegion === undefined) {
      this.#accountRegion = Regions.AMERICAS;
    } else {
      this.#accountRegion = accountRegion;
    }

    this.#region = region;
    this.#key = key;
  }

  public get accountRequest() {
    const request = axios.create({
      baseURL: `https://${this.#accountRegion.endpoint}.api.riotgames.com/`,
      headers: {
        "X-Riot-Token": this.#key,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    request.interceptors.response.use(ResponseInterpreter, ErrorInterpreter);

    return request;
  }

  public get request() {
    const request = axios.create({
      baseURL: `https://${this.#region.endpoint}.api.riotgames.com/`,
      headers: {
        "X-Riot-Token": this.#key,
        "Content-Type": "application/json;charset=UTF-8",
      },
    });

    request.interceptors.response.use(ResponseInterpreter, ErrorInterpreter);

    return request;
  }

  /**
   * The target region when querying the API
   */
  public get region(): Region {
    return this.#region;
  }

  /**
   * The target region when querying the API
   */
  public get accountRegion(): Region {
    return this.#accountRegion;
  }
}

export default API;
