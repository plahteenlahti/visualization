import React, { FC } from "react";
import styled from "styled-components";
import { Serie } from "../pages/index";
type Props = {
  serie: Serie;
};

export const Tooltip: FC<Props> = ({ serie }) => {
  return <Container>{serie.entity.name}</Container>;
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 2px;
  font-size: 0.9rem;
  padding: 0.4rem;
`;
