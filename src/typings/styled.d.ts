import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
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
    distinct: string[];
  }
}
