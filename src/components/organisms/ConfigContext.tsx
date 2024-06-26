import React, { createContext, useContext, useEffect, useState } from "react";
import ConfigurationsClient from "../../api/configurations-client";
import { ConfigItem } from "../../model/configurations";

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

  useEffect(() => {
    const fetchData = async () => {
      const client = new ConfigurationsClient();
      try {
        const data = await client.getConfigurationsData();
        setConfigData(data);
      } catch (error: any) {
        console.log("error :>> ", error);
        // TODO: show error message
      }
    };

    fetchData();
  }, []);

  return (
    <ConfigContext.Provider value={{ configData }}>
      {children}
    </ConfigContext.Provider>
  );
};
