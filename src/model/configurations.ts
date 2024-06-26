// These are the supported configurational options so far
export type Option = "store-name" | "video-url";

export type ConfigItem = {
  option: Option;
  value: string;
};
