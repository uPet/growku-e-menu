import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ConfigurationsClient from "../../api/configurations-client";
import { ConfigItem } from "../../model/configurations";
import Toaster from "../atoms/Toaster.tsx/Toaster";

type ConfigContextType = {
  configData: ConfigItem;
  isLoading?: boolean;
};

const defaultConfigData: ConfigItem = {
  domain_url: "",
  background_image_url: "",
  background_color: "",
  store_logo_url: "",
  splash_video_url: "",
  splash_image_url: "",
  home_category_title: "",
  brand_color: "",
  colors_text_default: "",
  colors_text_heading: "",
  colors_text_critical: "",
  colors_background_default: "",
  colors_background_critical: "",
  colors_modal_background: "",
  colors_modal_overlay: "",
  colors_modal_border_color: "",
  product_card_placeholder_image_url: "",
  product_featured_card_placeholder_image_url: ""
};

const ConfigContext = createContext<ConfigContextType>({
  configData: defaultConfigData,
});

// Custom hook to use ConfigContext
export const useConfig = () => useContext(ConfigContext);

type ConfigProviderProps = {
  children: React.ReactNode;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [configData, setConfigData] = useState<ConfigItem>(defaultConfigData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cookieConfigData = Cookies.get("configData");
    if (cookieConfigData) {
      setConfigData(JSON.parse(cookieConfigData));
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = new ConfigurationsClient();
        const serverConfigData = await client.getConfigurationsData();
        setConfigData(serverConfigData);
        setError("");
        Cookies.set("configData", JSON.stringify(serverConfigData));
      } catch (error: any) {
        setError(
          `Error fetching or updating the configurations data. Please try again later.`
        );
      }
    };

    fetchData();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <ConfigContext.Provider value={{ configData, isLoading }}>
      {children}
      <Toaster
        message={error}
        isVisible={Boolean(error)}
        onClose={() => setError("")}
      />
    </ConfigContext.Provider>
  );
};
