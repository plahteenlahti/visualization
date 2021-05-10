import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundAlt: string;
      backgroundInverted: string;
      text: string;
      textInverted: string;
      textHighlight: string;
      link: string;
      linkActive: string;
      linkHover: string;
      active: string;
      contrast: string;
      border: string;
      heatmap: string;
      lineChartDefaultColor: string;
      barChartDefaultColor: string;
      stroke: string;
      ranges: {
        toolExperience: {
          would_use: string;
          would_not_use: string;
          interested: string;
          not_interested: string;
          never_heard: string;
        };
        featureExperience: {
          used_it: string;
          know_not_used: string;
          never_heard_not_sure: string;
        };
        featureExperienceSimplified: {
          know_it: string;
          used_it: string;
        };
        gender: {
          male: string;
          female: string;
          non_binary: string;
          prefer_not_to_say: string;
        };
      };
      distinct: string[];
    };
    mode: "light" | "dark";
    accentColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    borderColor: string;
    primaryBackground: string;
    primaryBackgroundTransparent: string;
    secondaryBackground: string;
    errorColor: string;
    successColor: string;
  }
}
