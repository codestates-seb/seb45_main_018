import styled from 'styled-components';
import ContactText from '../assets/Contact-text.png';
import ContactEmail from '../assets/Contact-Email.png';
import ContactEmailHover from '../assets/Contact-Email-Hover.png';
import ContactPhone from '../assets/Contact-Phone.png';
import ContactPhoneHover from '../assets/Contact-Phone-Hover.png';
import ContactInsta from '../assets/Contact-Insta.png';
import ContactInstaHover from '../assets/Contact-Insta-Hover.png';

import { useState } from 'react';

const Contact = () => {
  const [isHovered, setIsHovered] = useState('null');

  return (
    <>
      <ContactWholeContainer>
        <StyledImage src={ContactText} />
        <ContactContainer>
          <ContactImage
            src={isHovered === 'email' ? ContactEmailHover : ContactEmail}
            onMouseOver={() => setIsHovered('email')}
            onMouseOut={() => setIsHovered('null')}
          />
          <ContactImage
            src={isHovered === 'phone' ? ContactPhoneHover : ContactPhone}
            onMouseOver={() => setIsHovered('phone')}
            onMouseOut={() => setIsHovered('null')}
          />
          <ContactImage
            src={isHovered === 'insta' ? ContactInstaHover : ContactInsta}
            onMouseOver={() => setIsHovered('insta')}
            onMouseOut={() => setIsHovered('null')}
          />
        </ContactContainer>
      </ContactWholeContainer>
    </>
  );
};

export default Contact;

const ContactWholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0.7);
`;

const StyledImage = styled.img`
  margin-top: 8rem;
`;

const ContactContainer = styled.div`
  display: flex;
  margin-top: 7rem;
  gap: 10rem;
  transform: scale(0.9);

`;

const ContactImage = styled.img``;
