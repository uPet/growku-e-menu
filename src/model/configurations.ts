// These are the supported configurational options so far
export type Option =
  | "domain_url"
  | "background_image_url"
  | "store_logo_url"
  | "splash_video_url"
  | "splash_image_url"
  | "home_category_title"
  | "brand_color"
  | "colors_text_default"
  | "colors_text_heading"
  | "colors_text_critical"
  | "colors_background_default"
  | "colors_background_critical"
  | "colors_modal_background"
  | "colors_modal_overlay";

export type ConfigItem = Record<Option, string>;
