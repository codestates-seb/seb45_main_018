import styled from 'styled-components';
import logo from '../../assets/Logo.png';

const Footer = () => {
  return (
    <>
    <FooterContainer>
        <FooterInfoContainer>
      <FooterLogoSectionContainer>
        <FooterLogoText>
          <Logo src={logo} />
          POLARECO
        </FooterLogoText>
        <FooterLogoContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus
          magna fringilla urna
        </FooterLogoContent>
      </FooterLogoSectionContainer>
      <FooterSectionContainer>
        <FooterSectionTitle>Company</FooterSectionTitle>
        <FooterSectionContent>
          <div className="footer-content">About Us</div>
          <div className="footer-content">Contact Us</div>
          <div className="footer-content">Features</div>
        </FooterSectionContent>
      </FooterSectionContainer>
      <FooterSectionContainer>
        <FooterSectionTitle>Services</FooterSectionTitle>
        <FooterSectionContent>
          <div className="footer-content">Eco-Habit</div>
          <div className="footer-content">Challenge</div>
          <div className="footer-content">Community</div>
          <div className="footer-content">Sponsor</div>
        </FooterSectionContent>
      </FooterSectionContainer>
      <FooterContactSection>
        <FooterSectionTitle>Contact</FooterSectionTitle>
        <FooterSectionContent>
          <div className="footer-content">(+82) 10-0000-0000</div>
          <div className="footer-content">polareco.official@gmail.com</div>
          <div className="footer-content">Address: Gangnamgu, Seoul, 03232</div>
        </FooterSectionContent>
      </FooterContactSection>
      <FooterSectionContainer>
        <FooterSectionTitle>Link</FooterSectionTitle>
        <FooterSectionContent>
          <div className="footer-content">Terms of Service</div>
          <div className="footer-content">Privacy Policy</div>
          <div className="footer-content">Career</div>
        </FooterSectionContent>
      </FooterSectionContainer>
      </FooterInfoContainer>
      <RigthInfo>© 2023 Polareco - All Rights Reserved</RigthInfo>
    </FooterContainer>
          </>
  );
};

export default Footer;

const Logo = styled.img`
  width: 51px;
  height: 37px;
  margin-right: 8px;
`;

const FooterContainer = styled.div`
  max-width: 1920px;
  min-width: 960px;
  height: 738px;
  width: 1920px;
  background-color: #131313;
  `

const FooterInfoContainer = styled.div`
  display: flex;
`;

const FooterSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  margin-right: 122px;
`;

const FooterContactSection = styled(FooterSectionContainer)`
  margin-right: 88px;
  width: 332px;
`;

const FooterLogoSectionContainer = styled(FooterSectionContainer)`
  margin-left: 135px;
  margin-right: 140px;
`;

const FooterSectionTitle = styled.div`
  font-size: 36px;
  color: var(--White, #fdfdfd);
  /* H2 */
  font-family: 'Inter';
  text-align: left;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 46.8px */
  margin-bottom: 51px;
`;

const FooterLogoText = styled(FooterSectionTitle)`
  font-weight: 900;
`;

const FooterSectionContent = styled.div`
  color: #b2afaf;
  /* H4 */
  font-family: 'Inter';
  font-size: 24px;
  text-align: left;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /*31.2px*/

  > .footer-content {
    margin-bottom: 25px;
  }
`;

const FooterLogoContent = styled(FooterSectionContent)`
  color: #b2afaf;
  /* Paragraf Text */
  font-family: 'Inter';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  width: 304px;
`;

const RigthInfo = styled.div`
  color: var(--White, #fdfdfd);
  text-align: center;
  /* H4 */
  font-family: 'Inter';
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 31.2px */
  margin-top: 180px;
`;
