import React, { ReactElement } from "react";

import { Container, TextWrapper, Content } from "./styles";

interface Props {
  title: string;
  content: string;
}

const Block: React.FC<Props> = ({ title, content }: Props): ReactElement => {
  return (
    <Container>
      <h6>{title}</h6>
      <TextWrapper>
        <Content>{content}</Content>
      </TextWrapper>
    </Container>
  );
};

export default Block;
