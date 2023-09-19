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
import SettingModal from "../components/features/SettingModal";
import StatusModal from "../components/features/StatusModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import axios from "axios";
import { setMyMissions } from "../redux/slice/myMissionSlice";
import WeekStamps from "../components/features/WeekStamps";

function Ecohabit () {
    const dispatch = useDispatch();

    const apiUrl = useSelector((state:RootState) => state.api.APIURL);

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
    const resetMissionHandler = async () => {
        try {
            // 서버에서 모든 미션 삭제
            const response = await axios.delete(
              `${apiUrl}/mission/my_missions`,
              {
                headers: {
                  Authorization: `${localStorage.getItem('accessToken')}`,
                },
              }
            );
            if (response.status === 204) {
              console.log("모든 나만의 미션을 삭제했습니다.");
                // redux에서 모든 미션 삭제
                dispatch(setMyMissions([]));
            } else {
              console.error("나만의 미션을 삭제하는 중 오류가 발생했습니다.");
            }
          } catch (error) {
            console.error("오류가 발생했습니다.", error);
          }
    };

    return (
        <Container>
            <ContentsContiner>
                <StampContainer>
                    <div className="title-wrapper">
                        <Title>
                            <PiStarFourFill style={{color: '#D3F169'}}/>
                            Stamps of Week!
                        </Title>
                        <CommonButton
                            className="my-stamp-status"
                            onClick={statusOpenHandler}>나의 스탬프 현황</CommonButton>
                    </div>
                    <div>
                        <WeekStamps />
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
            align-items: center;

        &.title-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        &.week-stamps {
            width: 650px;
            height: 100px;
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