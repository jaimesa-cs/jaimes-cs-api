import type { NextApiRequest, NextApiResponse } from "next";

export interface IBaseService {
  id: string;
  description: string;
  getDetails: () => any;
  execute: () => Promise<void>;
  test: () => Promise<void>;
}
