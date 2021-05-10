import { DefaultTheme } from "styled-components";
import colors from "./colors";

export const darkTheme: DefaultTheme = {
  background: colors.greyDarker,
  backgroundAlt: colors.greyDarkish,
  backgroundInverted: colors.greyLight,
  text: colors.greyLight,
  textInverted: colors.greyDarker,
  textHighlight: colors.teal,
  link: colors.teal,
  linkActive: colors.tealLighter,
  linkHover: colors.red,
  active: colors.teal,
  contrast: colors.red,
  border: colors.greyMediumest,
  heatmap: colors.teal,
  lineChartDefaultColor: colors.red,
  barChartDefaultColor: colors.red,
  stroke: colors.greyMediumest,
  distinct: [
    colors.indigo,
    colors.teal,
    colors.pink,
    colors.red,
    colors.green,
    colors.yellow,
    colors.aqua,
    colors.orange,
    colors.olive,
    colors.skyblue,
    colors.purple,
  ],

  chart: {
    background: colors.greyDarker,
    textColor: colors.greyLight,
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: colors.greyLight,
          strokeWidth: 0,
        },
      },
      ticks: {
        line: {
          stroke: colors.greyLight,
          strokeWidth: 0,
        },
      },
    },
    grid: {
      line: {
        stroke: colors.greyLight,
        strokeWidth: 1,
      },
    },
  },
};

export const lightTheme: DefaultTheme = {
  background: colors.greyLight,
  backgroundAlt: colors.greyDarkish,
  backgroundInverted: colors.greyLight,
  text: colors.greyDarker,
  textInverted: colors.greyDarker,
  textHighlight: colors.teal,
  link: colors.indigo,
  linkActive: colors.indigo,
  linkHover: colors.red,
  active: colors.indigo,
  contrast: colors.red,
  border: colors.greyMediumest,
  heatmap: colors.indigo,
  lineChartDefaultColor: colors.red,
  barChartDefaultColor: colors.red,
  stroke: colors.greyMediumest,
  distinct: ["#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"],

  chart: {
    background: colors.greyLight,
    textColor: colors.greyDarker,
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: colors.greyDarker,
          strokeWidth: 0,
        },
      },
      ticks: {
        line: {
          stroke: colors.greyDarker,
          strokeWidth: 0,
        },
      },
    },
    grid: {
      line: {
        stroke: colors.greyDarker,
        strokeWidth: 1,
      },
    },
  },
};
