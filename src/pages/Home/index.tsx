import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import { Styles } from "../../styles/styles";

const Contact = lazy(() => import("../../component/ContactForm"));
const MiddleBlock = lazy(() => import("../../component/MiddleBlock"));
const Container = lazy(() => import("../../component/common/Container"));
const ScrollToTop = lazy(() => import("../../component/common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../component/ContentBlock"));
const Header = lazy(() => import("../../component/Header"));
const Footer = lazy(() => import("../../component/Footer"));

const Home: React.FC = () => {
  return (
    <>
      <Styles />
      <Header />
      <Container>
        <ScrollToTop />
        <ContentBlock
          direction="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="doctor2.svg"
          id="intro"
        />
        <MiddleBlock
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          button={MiddleBlockContent.button}
        />
        <ContentBlock
          direction="left"
          title={AboutContent.title}
          content={AboutContent.text}
          // section={AboutContent.section}
          icon="Med record.svg"
          id="about"
        />
        <ContentBlock
          direction="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="doctorpatient (2).svg"
          id="mission"
        />
        <ContentBlock
          direction="left"
          title={ProductContent.title}
          content={ProductContent.text}
          icon="prescription.svg"
          id="product"
        />
        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
