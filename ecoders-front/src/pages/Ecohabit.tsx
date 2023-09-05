import { styled } from "styled-components";
import { PiStarFourFill } from "react-icons/pi";

function Ecohabit () {
    return (
        <Container>
            <ContentsContiner>
                <StampContainer>
                    <div><PiStarFourFill /> Stamps of Week!</div>
                    <div>
                        <div>요일</div>
                        <div>
                            
                        </div>
                    </div>
                </StampContainer>
                <MyMissionContainer>
                    <div><PiStarFourFill /> 나만의 미션!</div>
                </MyMissionContainer>
                <TodayMissionContainer>
                    <div><PiStarFourFill /> 오늘의 미션!</div>
                </TodayMissionContainer>
            </ContentsContiner>
        </Container>
    )
}

export default Ecohabit;

const Container = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

const ContentsContiner = styled.div`
    border-left: 1px solid black;
    border-right: 1px solid black;
    width: 60rem;
`;

const StampContainer = styled.div`
    
`;

const MyMissionContainer = styled.div`
    
`;

const TodayMissionContainer = styled.div`
    
`;
