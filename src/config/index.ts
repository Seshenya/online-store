export interface IConfigData {
    itemsUrl: string;
}

class Config {
  public data: IConfigData;

  public constructor() {
    const env: "dev" | "qa" | "prod" =
      (process.env.REACT_APP_NODE_ENV as any) || "dev";
    let envConfig;
    if (env === "dev") {
      envConfig = require("./dev.ts");
    }
    this.data = envConfig.default;
  }
}

export default new Config();