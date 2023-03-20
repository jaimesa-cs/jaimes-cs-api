import { NextApiRequest, NextApiResponse } from "next";

import BaseService from "./base";
import { EntryEmbedable } from "@contentstack/utils/dist/types/Models/embedded-object";
import { Utils } from "contentstack";

const renderOption = {
  ["span"]: (node: any, next: any) => {
    return next(node.children);
  },
};

const flattenObj = (obj: any): any => {
  //   console.log(obj);
  const fakeEntry: EntryEmbedable = {
    uid: "fake",
    field: obj,
  };
  // console.log("Fake Entry", fakeEntry);
  Utils.jsonToHTML({ entry: fakeEntry, paths: ["field"], renderOption: renderOption });
  return fakeEntry.field.replace(/<[^>]+>/g, "");
};
const flattenJson = (obj: any): void => {
  for (const [k, val] of Object.entries(obj)) {
    const v = val as any;
    if (typeof v === "object" && v.hasOwnProperty("type") && v["type"] === "doc") {
      obj[k] = flattenObj(v);
    } else if (typeof v === "object") {
      if (Array.isArray(v)) {
        const newArray = [];

        for (let i = 0; i < v.length; i++) {
          const subObj = v[i];
          if (typeof subObj === "object" && subObj.hasOwnProperty("type") && subObj["type"] === "doc") {
            newArray.push(flattenObj(subObj));
          } else {
            flattenJson(v[i]);
            newArray.push(v[i]);
          }
        }
        // console.log(">>> New Array", newArray);
        obj[k] = newArray;
      } else {
        flattenJson(v);
      }

      flattenJson(v);
    }
  }
};

export default class AlgoliaService extends BaseService {
  test(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super("algolia", "Algolia transformation", req, res);
  }

  async execute() {
    try {
      const body = this.getRequestBody();
      flattenJson(body);
      this.success(body);
    } catch (e) {
      console.log(e);
      this.error(e);
    }
  }
}
