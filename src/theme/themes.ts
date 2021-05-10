import { DefaultTheme } from "styled-components";
import colors from "./colors";

export const darkTheme: DefaultTheme = {
  colors: {
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
    ranges: {
      toolExperience: {
        would_use: colors.red,
        would_not_use: colors.redLight,
        interested: colors.teal,
        not_interested: colors.tealLight,
        never_heard: colors.greyMedium,
      },
      featureExperience: {
        used_it: colors.teal,
        know_not_used: colors.tealDarker,
        never_heard_not_sure: colors.greyMedium,
      },
      featureExperienceSimplified: {
        know_it: colors.tealDarker,
        used_it: colors.teal,
      },
      gender: {
        male: colors.blue,
        female: colors.teal,
        non_binary: colors.red,
        prefer_not_to_say: colors.greyMediumer,
      },
    },
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
  },
  mode: "dark",
  accentColor: "#de25a8",
  primaryTextColor: "#f7f8f8",
  secondaryTextColor: "#8a8f98",
  borderColor: "#303236",
  primaryBackground: "#1c1d1f",
  primaryBackgroundTransparent: "rgba(28, 29, 31, 0.8)",
  secondaryBackground: "#27282b",
  errorColor: "#FE453B",
  successColor: "#2CD057",
};

export const lightTheme: DefaultTheme = {
  colors: {
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
    ranges: {
      toolExperience: {
        would_use: colors.red,
        would_not_use: colors.redLight,
        interested: colors.teal,
        not_interested: colors.tealLight,
        never_heard: colors.greyMedium,
      },
      featureExperience: {
        used_it: colors.teal,
        know_not_used: colors.tealDarker,
        never_heard_not_sure: colors.greyMedium,
      },
      featureExperienceSimplified: {
        know_it: colors.tealDarker,
        used_it: colors.teal,
      },
      gender: {
        male: colors.blue,
        female: colors.teal,
        non_binary: colors.red,
        prefer_not_to_say: colors.greyMediumer,
      },
    },
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
  },
  mode: "light",
  accentColor: "#fe665e",
  primaryTextColor: "#000",
  secondaryTextColor: "#66615c",
  borderColor: "#ebeaeb",
  primaryBackground: "#fff",
  primaryBackgroundTransparent: "rgba(244, 245, 248, 0.8)",
  secondaryBackground: "#ebeaeb",
  errorColor: "#FB4A3E",
  successColor: "#36934C",
};
