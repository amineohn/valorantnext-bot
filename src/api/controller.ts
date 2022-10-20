import { API } from "./index";

abstract class Controller {
  readonly #instance: API;
  protected get request() {
    return this.#instance.request;
  }

  constructor(instance: API) {
    this.#instance = instance;
  }

  protected get instance() {
    return this.#instance;
  }

  protected get accountRequest() {
    return this.#instance.accountRequest;
  }
}

export default Controller;
