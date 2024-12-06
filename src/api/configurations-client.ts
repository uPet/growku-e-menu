import { gapi } from "gapi-script";
import { ConfigItem } from "../model/configurations";
// import { SheetsResponse } from "./model/GoogleSheets";
// import { Option } from "../model/configurations";

export default class ConfigurationsClient {
  private apiKey: string;
  private spreadsheetId: string;
  private initialized: boolean;

  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY || "";
    this.spreadsheetId = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID || "";
    this.initialized = false;
  }

  private async initializeClient(): Promise<void> {
    if (this.initialized) {
      return;
    }

    return new Promise((resolve, reject) => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: this.apiKey,
          })
          .then(() => {
            return gapi.client.load("sheets", "v4");
          })
          .then(() => {
            this.initialized = true;
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    });
  }

  private async getFirstSheetName(): Promise<string> {
    const response = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId: this.spreadsheetId,
    });

    const sheets = response.result.sheets;
    if (sheets && sheets.length > 0) {
      return sheets[0].properties.title;
    } else {
      throw new Error("No sheets found in the spreadsheet.");
    }
  }

  public async getConfigurationsData(): Promise<ConfigItem[]> {
    // Return static data for as we are going to change the source of data
    return [
      {
        option: 'video-url',
        value: 'https://cdn.shopify.com/videos/c/vp/176f7be3f0d74fd4bf4af1ce9d855bc8/176f7be3f0d74fd4bf4af1ce9d855bc8.HD-720p-1.6Mbps-28991975.mp4'
      },
      {
        option: 'store-name',
        value: 'Growku'
      }
    ];

    // try {
    //   await this.initializeClient(); // Ensure client is initialized before making API request
    //   const firstSheetName = await this.getFirstSheetName();
    //   const range = `${firstSheetName}!A1:B`; // Get the data of the columns A and B only
    //   const response = (await gapi.client.sheets.spreadsheets.values.get({
    //     spreadsheetId: this.spreadsheetId,
    //     range: range,
    //   })) as { result: SheetsResponse };

    //   const result = response?.result;
    //   if (result.values) {
    //     return result.values.slice(1).map((row: Option[]): ConfigItem => {
    //       return {
    //         option: row[0],
    //         value: row[1],
    //       };
    //     });
    //   } else {
    //     return [];
    //   }
    // } catch (error: any) {
    //   throw new Error(
    //     "Error reading Google Sheets data: " + error.message || ""
    //   );
    // }
  }
}
