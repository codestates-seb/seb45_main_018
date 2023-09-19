import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { styled } from "styled-components";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import Button from "../atoms/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import { toggleTodayMission, fetchTodayMissionsAsync } from "../../redux/slice/todayMissionSlice";

function TodaysMissionList () {
    const dispatch = useAppDispatch();

    const apiUrl = useSelector((state:RootState) => state.api.APIURL);
    const todaysMissions = useSelector((state: RootState) => state.todayMissions.todaymissions);
    const option = useSelector((state: RootState) => state.option.option);

    useEffect(() => {
        dispatch(fetchTodayMissionsAsync());
    }, [dispatch, option]);

    const toggleHandler = async (todayMissionId: number) => {
        try {
            // 현재 미션 찾기
            const mission = todaysMissions.find((mission) => mission.todayMissionId === todayMissionId);


            if (mission) {
                // completed 값 변경
                const updatedCompleted = !mission.completed;

                // 서버 요청
                const response = await axios.patch(
                    `${apiUrl}/mission/today_mission/${todayMissionId}`, updatedCompleted,
                    {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                    }
                );

                if (response.status === 200) {
                    console.log(`미션 ${todayMissionId}를 업데이트했습니다.`);
                    dispatch(toggleTodayMission(todayMissionId));
                } else {
                    console.error(`미션 ${todayMissionId} 업데이트 오류가 발생했습니다.`);
                }
            }
        } catch (error) {
            console.error(`오류가 발생했습니다.`, error);
        }
    };

    return (
        <Container>
            <MissionList>
                {todaysMissions && todaysMissions.map((mission) => (
                    <React.Fragment key={mission.todayMissionId}>
                        {mission.completed ? (
                            <CompletedMission
                                data-today-mission-id={mission.todayMissionId}
                                onClick={() => toggleHandler(mission.todayMissionId)}>
                                {mission.content}
                                <BsFillCheckCircleFill
                                    style ={{ color: '#D4FFC0' }}
                                    onClick={() => toggleHandler(mission.todayMissionId)} />
                            </CompletedMission>
                        ) : (
                        <Mission
                            data-today-mission-id={mission.todayMissionId}
                            onClick={() => toggleHandler(mission.todayMissionId)}>
                            {mission.content}
                            <CompletedButton onClick={() => toggleHandler(mission.todayMissionId)}/>
                        </Mission>
                    )}
                    </React.Fragment>
                ))}
            </MissionList>
        </Container>
    )
}
export default TodaysMissionList;

const Container = styled.div`
`;

const MissionList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
`;
const Mission = styled.li`
    width: 300px;
    height: 30px;
    padding: 30px 20px;
    background-color: #D4E2F1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
`;

const CompletedMission = styled.div`
    width: 300px;
    height: 30px;
    padding: 30px 20px;
    background-color: #fff;
    border: 1px solid #D4E2F1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    color: #BFBFBF;
    text-decoration-line: line-through;
    cursor: pointer;
`;

const CompletedButton = styled(Button)`
    width: 15px;
    height: 15px;
    background-color: #FF9999;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #D4FFC0;
    }
`;