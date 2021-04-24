import { lighten } from "polished";
import React from "react";
import styled from "styled-components";

const Header = styled.header`
  padding: 10px 16px;
  display: flex;
  border-bottom: 1px solid ${(props) => lighten(0.1, props.theme.color.darkOne)};
  justify-content: space-between;
`;

const StackId = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 400;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StackLogo = styled.div<{ image: string }>`
  background: url(${(props) => props.image}) center center no-repeat;
  background-size: contain;
  padding: 16px;
  flex: none;
`;

const CardHeader = (props: { stackId: string; stackLogo?: string }) => {
  return (
    <Header>
      <StackId>{props.stackId}</StackId>
      <StackLogo image={props.stackLogo} />
    </Header>
  );
};

export default CardHeader;
