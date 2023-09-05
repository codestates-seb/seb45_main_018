import { styled } from "styled-components";
import { PiStarFourFill } from "react-icons/pi";
import Button from "../components/atoms/Button";

function Ecohabit () {
    return (
        <Container>
            <ContentsContiner>
                <StampContainer>
                    <div>
                        <div><PiStarFourFill /> Stamps of Week!</div>
                        <Button>나의 스탬프 현황</Button>
                    </div>
                    <div>
                        주간 스탬프
                    </div>
                </StampContainer>
                <MyMissionContainer>
                    <div>
                        <div><PiStarFourFill /> 나만의 미션!</div>
                        <Button>+</Button>
                        <Button>R</Button>
                    </div>
                </MyMissionContainer>
                <TodayMissionContainer>
                    <div><PiStarFourFill /> 오늘의 미션!</div>
                    <div>미션 박스들</div>
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
