import { ConfigItem } from "../model/configurations";

export default class ConfigurationsClient {
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public async getConfigurationsData(): Promise<ConfigItem> {
    const response = await fetch(
      `${process.env.REACT_APP_WORDPRESS_SITE_URL}/wp-json/wc/v3/e-menu-config?storeName=${process.env.REACT_APP_STORE_NAME}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch configurations data: ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data) {
      throw new Error("No configuration data found");
    }

    return data;
  }
}
