import axios from "axios";

export interface UrlParams {
  year: number;
  cool: number;
}

export class Api {
  constructor() {}

  public static async get(params: UrlParams): Promise<any> {
    return await axios
      .get(
        `https://raw.githubusercontent.com/OHMORIYUSUKE/animeapp-db/api/${String(
          params.year
        )}-${String(params.cool)}.json`
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw new Error("APIエラー メッセージ:" + e);
      });
  }
}
