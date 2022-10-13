type Cool = 1 | 2 | 3 | 4;
const COOlLIST = ["冬", "春", "夏", "秋"] as const;
type CoolJapanese = typeof COOlLIST[number];

export interface FormWhen {
  id: string;
  year: number;
  cool: Cool;
  coolJapanese: CoolJapanese;
}

export interface FormWhenState {
  id: string;
}

export class YearAndCool {
  public static getAll(): FormWhen[] {
    const whenData: FormWhen[] = [];
    const day = new Date();
    const nowYear = day.getFullYear();
    const startYear = 2014;
    for (let i = startYear; i <= nowYear; i++) {
      for (let j = 0; j < 4; j++) {
        whenData.push({
          id: String(i) + String(j + 1),
          year: i,
          cool: (j + 1) as Cool,
          coolJapanese: COOlLIST[j] as CoolJapanese,
        });
      }
    }
    return whenData;
  }

  public static getById(id: string): FormWhen | undefined {
    const allData = this.getAll();
    for (let i = 0; i < allData.length; i++) {
      if (String(String(allData[i].year) + String(allData[i].cool)) === id) {
        return allData[i];
      }
    }
  }

  public static getJapaneseByCool(cool: Cool): CoolJapanese {
    return COOlLIST[cool - 1] as CoolJapanese;
  }

  public static getNow(): FormWhen {
    return this.getAll().slice(-1)[0];
  }
}
