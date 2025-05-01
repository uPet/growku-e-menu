import { useEffect } from "react";

import "./splashScreen.css";
import { useConfig } from "../organisms/ConfigContext";

export default function ThemeVariables() {
  const { configData } = useConfig();

  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty("--font-family-heading", '"Poppins", sans-serif');
    root.style.setProperty("--font-family-body", '"Poppins", sans-serif');
    root.style.setProperty(
      "--growu-body-background-image-url",
      `url("${configData["background_image_url"]}")`
    );

    root.style.setProperty(
      "--growku-background-color",
      configData["background_color"] || "black"
    );

    // Colors Variables
    root.style.setProperty("--growku-brand-color", configData["brand_color"]);
    root.style.setProperty(
      "--growku-text-default",
      configData["colors_text_default"]
    );
    root.style.setProperty(
      "--growku-text-heading",
      configData["colors_text_heading"]
    );
    root.style.setProperty(
      "--growku-text-critical",
      configData["colors_text_critical"]
    );
    root.style.setProperty(
      "--growku-background-default",
      configData["colors_background_default"]
    );
    root.style.setProperty(
      "--growku-background-critical",
      configData["colors_background_critical"]
    );
    root.style.setProperty(
      "--growku-modal-background-color",
      configData["colors_modal_background"]
    );
    root.style.setProperty(
      "--growku-modal-overlay",
      configData["colors_modal_overlay"]
    );
    root.style.setProperty(
      "--growku-modal-border-color",
      configData["colors_modal_border_color"]
    );
  }, [configData]);

  return null;
}
