import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { styled } from "styled-components";
import Button from "../atoms/Button";
import { completeMyMission } from "../../redux/slice/missionSlice";
import { BsFillCheckCircleFill, BsPencilSquare, BsTrash3Fill } from "react-icons/bs";



interface MyMissionListProps {
}


function MyMissionList () {
    const dispatch = useDispatch();

    const myMissions = useSelector((state: RootState) => state.missions.myMissions);


    const missionDoneHandler = (event: React.MouseEvent<HTMLLIElement | HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
        // 클릭된 요소에서 data-mission-id 값을 가져오기
        const missionId = parseInt((event.target as HTMLElement).getAttribute("data-mission-id") || "", 10);

        if (!isNaN(missionId)) {
        // 미션 완료 액션 디스패치
        console.log(`Clicked on mission with ID ${missionId}`);
        dispatch(completeMyMission(missionId));
        }
    };

    return (
        <Container>
            <MissionList>
                {myMissions.map((mission) => (
                    <React.Fragment key={mission.id}>
                        {mission.completed ? (
                            <CompleteMission
                                data-mission-id={mission.id}
                                onClick={missionDoneHandler}>
                                        {mission.text}
                                    <BsFillCheckCircleFill
                                        style ={{ color: '#D4FFC0' }}
                                        onClick={missionDoneHandler}
                                        />
                            </CompleteMission>
                        ) : (
                            <Mission
                                data-mission-id={mission.id}
                                onClick={missionDoneHandler}>
                                        {mission.text}
                                        <IconWrapper className="icon-wrapper">
                                            <EditIcon />
                                            <DeleteIcon />
                                        </IconWrapper>
                                        <CompletedButton onClick={missionDoneHandler} />
                            </Mission>
                        )}
                    </React.Fragment>
                ))}
            </MissionList>
        </Container>
    )
}

export default MyMissionList;

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
    cursor: pointer;

    &:hover {
        .icon-wrapper {
            display: flex;
        }
    }
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

    ${Mission}:hover & {
        display: none;
    }
`;

const CompleteMission = styled.li`
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

const IconWrapper = styled.div`
    display: none;
    gap: 5px;

    ${Mission}:hover & {
        display: flex;
    }
`;

const EditIcon = styled(BsPencilSquare)`
    cursor: pointer;
`;

const DeleteIcon = styled(BsTrash3Fill)`
    cursor: pointer;
`;