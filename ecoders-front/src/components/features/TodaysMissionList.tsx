import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { styled } from "styled-components";
import { useEffect } from "react";
import { fetchTodaysMissions } from "../../redux/slice/missionSlice";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import Button from "../atoms/Button";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { completeTodayMission } from "../../redux/slice/missionSlice";
import axios from "axios";


function TodaysMissionList () {
    const dispatch = useAppDispatch();

    const todaysMissions = useSelector((state: RootState) => state.missions.todaysMissions);

    useEffect(() => {
        dispatch(fetchTodaysMissions());
    }, [dispatch]);


    const missionDoneHandler = async (event: React.MouseEvent<HTMLLIElement | HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
        // 클릭된 요소에서 data-mission-id 값을 가져오기
        const todayMissionId = parseInt((event.target as HTMLElement).getAttribute("data-today-mission-id") || "", 10);

        if (!isNaN(todayMissionId)) {
        // 미션 완료 액션 디스패치
        dispatch(completeTodayMission(todayMissionId));
        // patch로 요청
        try {
            const mission = todaysMissions.find((m) => m.today_mission_id === todayMissionId);
            if (mission) {
                await axios.patch('api주소'), {
                    completed: mission.completed
                }
            }
        } catch (error) {
            console.error("요청을 보내는 도중 에러가 발생했습니다.", error);
        }
        }
    };

    return (
        <Container>
            <MissionList>
                {todaysMissions && todaysMissions.map((mission) => (
                    <React.Fragment key={mission.today_mission_id}>
                        {mission.completed ? (
                            <CompletedMission
                                data-today-mission-id={mission.today_mission_id}
                                onClick={missionDoneHandler}>
                                {mission.text}
                                <BsFillCheckCircleFill
                                    style ={{ color: '#D4FFC0' }}
                                    onClick={missionDoneHandler} />
                            </CompletedMission>
                        ) : (
                        <Mission
                            data-today-mission-id={mission.today_mission_id}
                            onClick={missionDoneHandler}>
                            {mission.text}
                            <CompletedButton onClick={missionDoneHandler}/>
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