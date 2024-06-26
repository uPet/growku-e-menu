import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ConfigurationsClient from "../../api/configurations-client";
import { ConfigItem } from "../../model/configurations";
import Toaster from "../atoms/Toaster.tsx/Toaster";

type ConfigContextType = {
  configData: ConfigItem[];
};

const ConfigContext = createContext<ConfigContextType>({ configData: [] });

// Custom hook to use ConfigContext
export const useConfig = () => useContext(ConfigContext);

type ConfigProviderProps = {
  children: React.ReactNode;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [configData, setConfigData] = useState<ConfigItem[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const cookieConfigData = Cookies.get("configData");
    if (cookieConfigData) {
      setConfigData(JSON.parse(cookieConfigData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookieConfigData = Cookies.get("configData");
        const client = new ConfigurationsClient();
        const serverConfigData = await client.getConfigurationsData();
        if (!cookieConfigData) {
          setConfigData(serverConfigData);
        }
        setError("");
        Cookies.set("configData", JSON.stringify(serverConfigData));
      } catch (error: any) {
        setError(
          `Error fetching the configurations data. Please try again later, ${error?.message}`
        );
      }
    };

    fetchData();
  }, []);

  return (
    <ConfigContext.Provider value={{ configData }}>
      {children}
      <Toaster
        message={error}
        isVisible={Boolean(error)}
        onClose={() => setError("")}
      />
    </ConfigContext.Provider>
  );
};
