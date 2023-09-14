import { styled } from "styled-components";
import { PiStarFourFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineKeyboardArrowUp, MdAdd } from "react-icons/md";
import Button from "../components/atoms/Button";
import MissionForm from "../components/atoms/MissionForm";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slice/modalSlice";
import { useState } from "react";
import MyMissionList from "../components/features/MyMissionList";
import TodaysMissionList from "../components/features/TodaysMissionList";
import { setMyMissions } from "../redux/slice/missionSlice";
import Stamp from "../components/features/Stamp";
import SettingModal from "../components/features/SettingModal";
import StatusModal from "../components/features/StatusModal";
import WeekStamps from "../components/features/WeekStamps";

function Ecohabit () {
    const dispatch = useDispatch();

    const [ isMissionFormVisible, setIsMissionFormVisible ] = useState(false);

    const statusOpenHandler = () => {
        dispatch(openModal("stampStatusModal"));
    };

    const settingOpenHandler = () => {
        dispatch(openModal("settingModal"));
    };

    // 입력 창 보이는 핸들러
    const addMissionHandler = () => {
        setIsMissionFormVisible(!isMissionFormVisible);
    };

    // 리스트 리셋 핸들러
    const resetMissionHandler = () => {
        dispatch(setMyMissions([]));
    };

    return (
        <Container>
            <ContentsContiner>
                <StampContainer>
                    <div>
                        <Title>
                            <PiStarFourFill style={{color: '#D3F169'}}/>
                            Stamps of Week!
                        </Title>
                        <CommonButton
                            className="my-stamp-status"
                            onClick={statusOpenHandler}>나의 스탬프 현황</CommonButton>
                    </div>
                    <div className="week-stamps">
                        주간 스탬프
                        <WeekStamps />
                        <Stamp />
                    </div>
                </StampContainer>
                <StatusModal />
                <MyMissionContainer>
                    <TitleBox>
                        <Title>
                            <PiStarFourFill style={{color: '#D3F169'}}/>
                            나만의 미션!
                        </Title>
                        <div className="button-box">
                            <CommonButton className="add-mission" onClick={addMissionHandler}>{!isMissionFormVisible ? (<MdAdd />) : (<MdOutlineKeyboardArrowUp />)}</CommonButton>
                        </div>
                        <div className="button-box">
                            <CommonButton className="reset-mission"
                                onClick={resetMissionHandler}>R</CommonButton>
                        </div>
                    </TitleBox>
                    {isMissionFormVisible && (
                        <div>
                            <MissionForm></MissionForm>
                        </div>)}
                    <MyMissionList />
                </MyMissionContainer>
                <TodayMissionContainer>
                    <TitleBox>
                        <Title>
                            <PiStarFourFill style={{color: '#D3F169'}}/>
                            오늘의 미션!
                        </Title>
                        <div className="setting-box"
                            onClick={settingOpenHandler}>
                            <FiSettings style={{color: '#CCCCCC'}} />
                        </div>
                    </TitleBox>
                    <div className="todays-mission">
                        <TodaysMissionList />
                    </div>
                </TodayMissionContainer>
                <SettingModal />
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
    height: 100vh;
    padding: 46px 24px;
    display: flex;
    flex-direction: column;
    gap: 5rem;

`;

const StampContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

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
    gap: 1.5rem;

    div {

        &.button-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            line-height: normal;
            cursor: pointer;
        }
    }
`;

const TodayMissionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    div {
        &.setting-box {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: normal;
            font-size: 25px;
            cursor: pointer;
        }

        &.todays-mission {
            height: 200px;
        }
    }
`;

const CommonButton = styled(Button)`
    text-align: center;
    line-height: normal;

    &.my-stamp-status {
        width: 150px;
        padding: 10px;
        background-color: #000;
        color: #fff;

        &:hover {
            background-color: #D4E2F1;
        }
    }

    &.add-mission {
        background-color: #D4E2F1;
        border: none;
        color: #fff;
        font-size: 20px;
    }

    &.reset-mission {
        background-color: #D4E2F1;
        border: none;
        color: #fff;
    }
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 600;
    line-height: normal;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;