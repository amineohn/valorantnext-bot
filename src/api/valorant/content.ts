import { Locale } from "../../types/alias";
import { ContentDto } from "../../types/valorant/content";
import Controller from "../controller";
import qs from "qs";

export class Content extends Controller {
  /**
   * Fetch all the content that VALORANT offers
   *
   * API Endpoint: `/val/content/v1/contents`
   *
   * @description Get content optionally filtered by locale
   *
   * @remark
   * **`Requires Development API Key`**
   *
   * @returns A promise containing the ContentV1 API Response: `{@link ContentDTo}`
   *
   * {@link https://developer.riotgames.com/apis#val-content-v1/GET_getContent Reference of VAL-CONTENT-V1}
   */

  public get(locale?: Locale): Promise<ContentDto> {
    let url = "/val/content/v1/contents";

    if (locale !== undefined) {
      url += "?" + qs.stringify(locale);
    }

    return this.request.get(url);
  }
}
