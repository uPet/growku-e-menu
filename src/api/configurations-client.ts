import { ConfigItem } from "../model/configurations";

export default class ConfigurationsClient {
  private apiKey: string;
  private spreadsheetId: string;
  private initialized: boolean;

  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || "";
    this.spreadsheetId = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID || "";
    this.initialized = false;
  }

  // If we have more settings, we can consume the wordpress API
  public async getConfigurationsData(): Promise<ConfigItem[]> {
    return [
      {
        option: "video-url",
        value: process.env.REACT_APP_SPLASH_VIDEO_URL || "",
      },
      {
        option: "store-name",
        value: process.env.REACT_APP_STORE_NAME || "",
      },
    ];
  }
}
