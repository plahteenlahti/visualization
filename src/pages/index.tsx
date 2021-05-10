import { BumpInputSerie, ResponsiveBump } from "@nivo/bump";
import { ascending, descending } from "d3-array";
import { graphql, PageProps } from "gatsby";
import React, { FC, useMemo, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Point } from "../components/Point";
import { Tooltip } from "../components/Tooltip";
import { darkTheme, lightTheme } from "../theme/themes";

type Entity = {
  name: string;
  id: string;
  description: string;
  category: string;
  github?: {
    description: string;
    forks: number;
    full_name: string;
    homepage: string;
    name: string;
    opened_issues: number;
    stars: number;
    url: string;
  } | null;
  homepage: string;
  npm: string;
  patterns: string;
  tags: string;
  type: string;
};

type Props = {
  stateOfJS: {
    survey: {
      frameworks: {
        experience: {
          entity: Entity;
        }[];
        awareness: {
          rank: number;
          percentage: number;
          year: number;
        }[];
        interest: {
          rank: number;
          percentage: number;
          year: number;
        }[];
        usage: {
          rank: number;
          percentage: number;
          year: number;
        }[];
        satisfaction: {
          rank: number;
          percentage: number;
          year: number;
        }[];
      };
      all: {
        experience: {
          entity: Entity;
        }[];
        awareness: {
          rank: number;
          percentage: number;
          year: number;
        }[];
        interest: {
          rank: number;
          percentage: number;
          year: number;
        }[];
        usage: {
          rank: number;
          percentage: number;
          year: number;
        }[];
        satisfaction: {
          rank: number;
          percentage: number;
          year: number;
        }[];
      };
    };
  };
};

type Metrics = "satisfaction" | "interest" | "usage" | "awareness";
type Orders = "ascending" | "descending";
const ALL_METRICS: Metrics[] = [
  "satisfaction",
  "interest",
  "usage",
  "awareness",
];

const orders: Orders[] = ["ascending", "descending"];

export type Serie = BumpInputSerie & {
  entity: Entity;
};

const IndexPage: FC<PageProps<Props>> = ({ data }) => {
  const [metric, setMetric] = useState<Metrics>("satisfaction");
  const [order, setOrder] = useState<Orders>("ascending");
  const [dataSet, setDataSet] = useState<"frameworks" | "all">("frameworks");
  const [userTheme, setUserTheme] = useState<"light" | "dark">("dark");
  const [highlightedItem, setHightlightedItem] = useState<undefined | Entity>(
    undefined
  );

  const chartData: Serie[] = useMemo(
    () =>
      data.stateOfJS.survey[dataSet].experience.map((tool) => {
        return {
          id: tool.entity.id,
          name: tool.entity.name,
          entity: tool.entity,
          data: tool[metric]
            .sort((a, b) =>
              order === "ascending"
                ? ascending(a.year, b.year)
                : descending(a.year, b.year)
            )
            .map((item) => {
              return {
                x: item.year,
                y: item.rank,
                percentage: item.percentage,
              };
            }),
        };
      }),
    [data, order, metric, dataSet]
  );

  return (
    <main>
      <title>Visualization</title>
      <ThemeProvider theme={userTheme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyles />

        <Configuration>
          <H1>JavaScript Front-end Frameworks and Libraries</H1>

          <Row>
            <Column>
              <H4>Metric</H4>
              <Options>
                {ALL_METRICS.map((item) => (
                  <Option
                    selected={metric === item}
                    key={item}
                    onClick={() => setMetric(item)}
                  >
                    {item}
                  </Option>
                ))}
              </Options>

              <Row>
                <Column>
                  <H4>Theme</H4>
                  <Options>
                    <Option
                      selected={userTheme === "dark"}
                      onClick={() => setUserTheme("dark")}
                    >
                      dark
                    </Option>
                    <Option
                      selected={userTheme === "light"}
                      onClick={() => setUserTheme("light")}
                    >
                      light
                    </Option>
                  </Options>
                </Column>
                <Column>
                  <H4>Data</H4>
                  <Options>
                    <Option
                      selected={dataSet === "frameworks"}
                      onClick={() => setDataSet("frameworks")}
                    >
                      frameworks
                    </Option>
                    <Option
                      selected={dataSet === "all"}
                      onClick={() => setDataSet("all")}
                    >
                      all tools
                    </Option>
                  </Options>
                </Column>
              </Row>
              <H4>Order</H4>
              <OrdersContainer>
                {orders.map((item) => (
                  <Order
                    selected={order === item}
                    key={item}
                    onClick={() => setOrder(item)}
                  >
                    {item}
                  </Order>
                ))}
              </OrdersContainer>
            </Column>

            <Column>
              <Highlight>
                {!highlightedItem ? (
                  <Info>Click to select and reveal more information</Info>
                ) : (
                  <>
                    <Info>{highlightedItem?.name}</Info>
                    <Info>{highlightedItem?.description}</Info>
                    <Info>{highlightedItem?.homepage}</Info>
                    <Info>Type: {highlightedItem?.category}</Info>

                    <Link href={highlightedItem?.github?.url}>Github</Link>
                    <Link href={highlightedItem?.github?.homepage}>
                      Homepage
                    </Link>
                    <Link href={highlightedItem?.npm}>NPM</Link>
                  </>
                )}
              </Highlight>
            </Column>
          </Row>
        </Configuration>
        <ChartContainer>
          {chartData && (
            <ResponsiveBump
              data={chartData}
              margin={{ top: 40, right: 110, bottom: 20, left: 110 }}
              inactiveLineWidth={5}
              enableGridX={true}
              enableGridY={false}
              theme={userTheme === "dark" ? darkTheme.chart : lightTheme.chart}
              colors={
                userTheme === "dark" ? darkTheme.distinct : lightTheme.distinct
              }
              axisTop={{
                tickSize: 0,
                tickPadding: 9,
              }}
              axisLeft={null}
              startLabel={(d) => d.name}
              startLabelTextColor={{
                from: "color",
              }}
              tooltip={({ serie }) => <Tooltip serie={serie} />}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 9,
              }}
              pointComponent={Point}
              startLabelPadding={20}
              endLabel={(d) => d.name}
              endLabelPadding={20}
              onMouseEnter={(serie: Serie) => setHightlightedItem(serie.entity)}
              lineWidth={5}
              pointSize={32}
              activeLineWidth={8}
              activePointSize={42}
              activePointBorderWidth={4}
              inactivePointSize={0}
              inactivePointBorderWidth={1}
              pointBorderWidth={3}
            />
          )}
        </ChartContainer>
        <Configuration>
          <H4>Download data</H4>
          <Link href={`/data2016.json`} download>
            2016 data set
          </Link>
          <Link href={`/data2017.json`} download>
            2017 data set
          </Link>
          <Link href={`/data2018.json`} download>
            2018 data set
          </Link>
          <Link href={`/data2019.json`} download>
            2019 data set
          </Link>
          <Link href={`/data2020.json`} download>
            2020 data set
          </Link>
        </Configuration>
      </ThemeProvider>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    stateOfJS {
      survey(survey: state_of_js) {
        frameworks: tools_rankings(
          ids: [
            angular
            reactnative
            svelte
            ember
            vuejs
            react
            preact
            elm
            meteor
            gatsby
            nextjs
            ionic
            quasar
            stimulus
            alpinejs
            nuxt
          ]
        ) {
          experience {
            awareness {
              percentage
              year
              rank
            }
            entity {
              name
              id
              description
              category
              github {
                description
                forks
                full_name
                homepage
                name
                opened_issues
                stars
                url
              }
              homepage
              npm
              patterns
              tags
              type
            }
            interest {
              percentage
              rank
              year
            }
            satisfaction {
              percentage
              rank
              year
            }
            usage {
              percentage
              year
              rank
            }
          }
        }

        all: tools_rankings(
          ids: [
            angular
            reactnative
            svelte
            ember
            vuejs
            react
            preact
            elm
            meteor
            gatsby
            nextjs
            ionic
            quasar
            stimulus
            alpinejs
            nuxt
            redux
            relay
            reason
            rollup
            radium
            expo
            enzyme
            express
            emotion
            vuex
            nest
            xstate
            mobx
            radium
            graphql
            styled_components
          ]
        ) {
          experience {
            awareness {
              percentage
              year
              rank
            }
            entity {
              name
              id
              description
              category
              github {
                description
                forks
                full_name
                homepage
                name
                opened_issues
                stars
                url
              }
              homepage
              npm
              patterns
              tags
              type
            }
            interest {
              percentage
              rank
              year
            }
            satisfaction {
              percentage
              rank
              year
            }
            usage {
              percentage
              year
              rank
            }
          }
        }
      }
    }
  }
`;

const ChartContainer = styled.div`
  height: 90vh;
  min-height: 800px;
  width: 100%;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type OptionProps = {
  selected: boolean;
};

const Option = styled.div<OptionProps>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: ${({ selected, theme }) =>
    selected ? theme.background : theme.active};
  border: 1px solid ${({ theme }) => theme.active};
  background-color: ${({ selected, theme }) =>
    selected ? theme.active : theme.background};
`;

const Configuration = styled.div`
  max-width: 1440px;
  margin: 1rem auto;
  padding: 0rem 1rem 1rem;
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Order = styled.div<OptionProps>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.active};
  color: ${({ selected, theme }) =>
    selected ? theme.background : theme.active};
  background-color: ${({ selected, theme }) =>
    selected ? theme.active : theme.background};
`;

const Highlight = styled.div``;

const H1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Open Sans", sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`;

const H4 = styled.h4`
  font-size: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex: 1;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.linkActive};
  padding: 0.4rem 04rem 0.4rem 0rem;
  text-decoration: none;
`;

const Info = styled.div`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.4rem;
`;
