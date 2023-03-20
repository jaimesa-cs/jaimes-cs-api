import type { NextApiRequest, NextApiResponse } from "next";

import { IBaseService } from "./interfaces/IBaseService";

export default abstract class BaseService implements IBaseService {
  id: string;
  description: string;
  private request: NextApiRequest | null;
  private response: NextApiResponse | null;
  private initialized: boolean = false;

  constructor(id: string, description: string, req: NextApiRequest, res: NextApiResponse) {
    this.id = id;
    this.description = description;
    this.request = req;
    this.response = res;
    this.initialized = true;
  }

  getPayload<T>(): T {
    try {
      if (this.request && this.request.body) {
        return this.request.body as T;
      }
    } catch (e) {
      console.log(e);
    }
    return {} as T;
  }
  getDetails() {
    return {
      id: this.id,
      description: this.description,
    };
  }

  getHeader(name: string): string {
    // console.log(this.request.headers);
    if (this.request && this.request !== null && this.request.headers && name && this.request.headers[name]) {
      const headerValue = this.request.headers[name];
      return headerValue?.toString() ?? "";
    }
    return "";
  }

  getRequestBody(): any {
    return this?.request?.body;
  }

  prepare() {}

  success<T>(payload?: string | T, status: number = 200) {
    this?.response?.status(status).send(payload || "OK");
  }
  error<T>(payload?: string | T) {
    this?.response?.status(500)?.send(payload || "ERROR");
  }

  abstract execute(): Promise<void>;
  abstract test(): Promise<void>;
}
