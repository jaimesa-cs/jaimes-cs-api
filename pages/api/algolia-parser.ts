// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import AlgoliaService from "./services/algolia";

type Data = {
  status: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  switch (req.method) {
    case "GET":
      res.status(404).json({ status: "GET method not available" });
      break;
    case "POST":
      const svc = new AlgoliaService(req, res);
      svc.execute();
      break;
    default:
      res.status(404).json({ status: "Method not available" });
      break;
  }
}
