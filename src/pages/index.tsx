import { graphql, PageProps } from "gatsby";
import React, { FC, useMemo, useState } from "react";
import { ResponsiveBump, BumpInputSerie } from "@nivo/bump";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../theme/themes";
import { descending, ascending } from "d3-array";
import { Point } from "../components/Point";

type Entity = {
  name: string;
  id: string;
  description: string;
  category: string;
  github: {
    description: string;
    forks: number;
    full_name: string;
    homepage: string;
    name: string;
    opened_issues: number;
    stars: number;
    url: string;
  };
  homepage: string;
  npm: string;
  patterns: string;
  tags: string;
  type: string;
};

type Props = {
  stateOfJS: {
    survey: {
      tools_rankings: {
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

type Serie = BumpInputSerie & {
  entity: Entity;
};

const IndexPage: FC<PageProps<Props>> = ({ data }) => {
  const [metric, setMetric] = useState<Metrics>("satisfaction");
  const [order, setOrder] = useState<Orders>("ascending");
  const [highlightedItem, setHightlightedItem] = useState<undefined | Entity>(
    undefined
  );

  const chartData: Serie[] = useMemo(
    () =>
      data.stateOfJS.survey.tools_rankings.experience.map((tool) => {
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
    [data, order, metric]
  );

  return (
    <main>
      <title>Visualization</title>
      <ThemeProvider theme={lightTheme}>
        <ChartContainer>
          {chartData && (
            <ResponsiveBump
              data={chartData}
              margin={{ top: 40, right: 120, bottom: 40, left: 120 }}
              inactiveLineWidth={5}
              enableGridX={true}
              enableGridY={false}
              axisTop={{
                tickSize: 0,
                tickPadding: 9,
              }}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 9,
              }}
              axisLeft={null}
              startLabel={(d) => d.name}
              startLabelTextColor={{
                from: "color",
              }}
              pointComponent={Point}
              startLabelPadding={20}
              endLabel={(d) => d.name}
              endLabelTextColor={{
                from: "color",
              }}
              endLabelPadding={20}
              onMouseEnter={(serie: Serie) => setHightlightedItem(serie.entity)}
              lineWidth={5}
              pointSize={36}
              pointBorderWidth={3}
              pointBorderColor={{ from: "serie.color" }}
              activeLineWidth={8}
              activePointSize={42}
              activePointBorderWidth={4}
              inactivePointSize={0}
              inactivePointBorderWidth={2}
            />
          )}
          <Configuration>
            <Highlight>
              <div>{highlightedItem?.category}</div>
            </Highlight>
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
          </Configuration>
        </ChartContainer>
      </ThemeProvider>
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  {
    stateOfJS {
      survey(survey: state_of_js) {
        tools_rankings(
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
  height: 500px;
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
  border: 1px solid ${({ theme }) => theme.colors.active};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.active : theme.colors.background};
`;

const Configuration = styled.div`
  max-width: 1440px;
  margin: 1rem auto;
`;

const OrdersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Order = styled.div<OptionProps>`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.active};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.active : theme.colors.background};
`;

const Highlight = styled.div``;
