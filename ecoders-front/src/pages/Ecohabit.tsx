import { styled } from "styled-components";
import { PiStarFourFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import Button from "../components/atoms/Button";
import MissionForm from "../components/features/MissionForm";

function Ecohabit () {
    return (
        <Container>
            <ContentsContiner>
                <StampContainer>
                    <div>
                        <div className="mission-title">
                            <PiStarFourFill style={{color: '#D3F169'}}/>
                            Stamps of Week!
                        </div>
                        <CommonButton
                            className="my-stamp-status">나의 스탬프 현황</CommonButton>
                    </div>
                    <div className="week-stamps">
                        주간 스탬프
                    </div>
                </StampContainer>
                <MyMissionContainer>
                    <div>
                        <div>
                            <PiStarFourFill style={{color: '#D3F169'}}/>
                            나만의 미션!
                        </div>
                        <CommonButton className="add-mission">+</CommonButton>
                        <CommonButton className="reset-mission">R</CommonButton>
                    </div>
                    <div>
                        <MissionForm></MissionForm>
                    </div>
                </MyMissionContainer>
                <TodayMissionContainer>
                    <div>
                        <PiStarFourFill style={{color: '#D3F169'}}/>
                        오늘의 미션!
                        <FiSettings />
                    </div>
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
    padding: 0px 24px;
`;

const StampContainer = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &.mission-title {
            font-size: 32px;
            font-weight: 600;
            line-height: normal;
        }

        &.week-stamps {
            width: 650px;
            height: 100px;
            background-color: aliceblue;
        }
    }
`;

const MyMissionContainer = styled.div`
    display: flex;
    flex-direction: column;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

const TodayMissionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommonButton = styled(Button)`

    &.my-stamp-status {
        width: 150px;
        padding: 10px;
    }
`
