import styled from "styled-components"
import imagePath from "../assets/Main.png"


const Main = () => {
    return (
      <StyledImage src={imagePath} />
    )
  };
  
  export default Main;

  const StyledImage = styled.img`
  /* width: 100%; */
  min-width: 960px;  
`;