import { Row, Col } from "antd";
import { SvgIcon } from "../common/SvgIcon";
import Container from "../common/Container";

import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = () => {
  const SocialLink = ({ href, src }: SocialLinkProps) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        key={src}
        aria-label={src}
      >
        <SvgIcon src={src} width="25px" height="25px" />
      </a>
    );
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={8} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{"Contact"}</Language>
              <Large to="/">{"Tell us everything"}</Large>
              <Para>{`Company number: 0428.555.896`}</Para>
              <a href="mailto:l.qqbadze@gmail.com">
                <Chat>{`Let's Chat`}</Chat>
              </a>
            </Col>
            <Col lg={8} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{"Address"}</Language>
              <Para>Corilus sa</Para>
              <Para>Rue du Moulin Brabant 2</Para>
              <Para>5030 Gembloux</Para>
            </Col>
            <Col lg={8} md={10} sm={12} xs={12}>
              <Empty />
              <Title>{"Company"}</Title>
              <Large to="/">{"About"}</Large>
              <Large to="/">{"Blog"}</Large>
              <Large to="/">{"Press"}</Large>
              <Large to="/">{"Careers & Culture"}</Large>
            </Col>
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon
                  src="logo.svg"
                  aria-label="homepage"
                  width="101px"
                  height="64px"
                />
              </LogoContainer>
            </NavLink>
            <FooterContainer>
              {/* <SocialLink
                href="https://www.linkedin.com/in/lasha-kakabadze/"
                src="linkedin.svg"
              /> */}
              {/* <a
                href="https://ko-fi.com/Y8Y7H8BNJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  height="36"
                  style={{ border: 0, height: 36 }}
                  src="https://storage.ko-fi.com/cdn/kofi3.png?v=3"
                  alt="Buy Me a Coffee at ko-fi.com"
                />
              </a> */}
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default Footer;
