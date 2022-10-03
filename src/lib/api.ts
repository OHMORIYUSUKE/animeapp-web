import axios from "axios";
import { z } from "zod";
import { apiSchema } from "../schema/apiSchema";

export interface UrlParams {
  year: number;
  cool: number;
}

export class Api {
  constructor() {}

  public static async get(
    params: UrlParams
  ): Promise<z.infer<typeof apiSchema>> {
    return await axios
      .get(
        `https://raw.githubusercontent.com/OHMORIYUSUKE/animeapp-db/api/${String(
          params.year
        )}-${String(params.cool)}.json`
      )
      .then((res) => {
        return apiSchema.parse(res.data);
      })
      .catch((e) => {
        throw new Error("APIエラー メッセージ:" + e);
      });
  }
}
