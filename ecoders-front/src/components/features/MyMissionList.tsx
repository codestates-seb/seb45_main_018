import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { styled } from "styled-components";
import Button from "../atoms/Button";
import { completeMyMission, updateMyMissionText, deleteMyMission } from "../../redux/slice/missionSlice";
import { BsFillCheckCircleFill, BsPencilSquare, BsTrash3Fill } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";


function MyMissionList () {
    const dispatch = useAppDispatch();

    const myMissions = useSelector((state: RootState) => state.missions.myMissions);

    const [ editedText, setEditedText ] = useState<string | null>(null);
    const [ editedMissionId, setEditedMissionId ] = useState<number | null>(null);

    const missionDoneHandler = (event: React.MouseEvent<HTMLLIElement | HTMLButtonElement | HTMLDivElement, MouseEvent>) => {
        // 클릭된 요소에서 data-mission-id 값을 가져오기
        const missionId = parseInt((event.target as HTMLElement).getAttribute("data-mission-id") || "", 10);

        if (!isNaN(missionId)) {
        // 미션 완료 액션 디스패치
        console.log(`Clicked on mission with ID ${missionId}`);
        dispatch(completeMyMission(missionId));
        }
    };

    // 미션 수정 모드로 만들기
    const editHandler = (missionId: number, text: string) => {
        setEditedMissionId(missionId);
        setEditedText(text);
    };

    // 입력하는 필드 변경 처리하기
    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(event.target.value);
    };

    const saveHandler = (missionId: number) => {
        if (editedText !== null) {
            // 미션 텍스트를 업데이트
            // put이나 patch로
            dispatch(updateMyMissionText({ missionId, newText: editedText }));
            setEditedMissionId(null);
            setEditedText(null);
        }
    };

    const inputRef = useRef<HTMLInputElement | null>(null);

    // 수정 모드로 가면 input창에 커서 포커스
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [editedMissionId]);

    const deleteHandler = (missionId: number) => {
        dispatch(deleteMyMission(missionId))
    }

    return (
        <Container>
            <MissionList>
                {myMissions.map((mission) => (
                    <React.Fragment key={mission.my_mission_id}>
                        {mission.completed ? (
                            <CompleteMission
                                data-mission-id={mission.my_mission_id}
                                onClick={missionDoneHandler}>
                                        {mission.text}
                                    <BsFillCheckCircleFill
                                        style ={{ color: '#D4FFC0' }}
                                        onClick={missionDoneHandler}
                                        />
                            </CompleteMission>
                        ) : (
                            <Mission
                                className={editedMissionId === mission.my_mission_id ? "editing" : ""}
                                data-mission-id={mission.my_mission_id}
                                onClick={missionDoneHandler}>
                                        {editedMissionId === mission.my_mission_id ? (
                                    <div className="edit-form">
                                        <EditMission
                                            type="text"
                                            value={editedText || ""}
                                            onChange={inputChangeHandler}
                                            onBlur={() => saveHandler(mission.my_mission_id)}
                                            onKeyUp={(event) => {
                                                if (event.key === "Enter") {
                                                    saveHandler(mission.my_mission_id);
                                                }
                                            }}
                                            ref={inputRef}
                                        />
                                            <FaCircleArrowUp
                                                className="editing-complete"
                                                onClick={() => saveHandler(mission.my_mission_id)}
                                                style={{color: '#CCCCCC'}}/>
                                    </div>
                                ) : (
                                    <div onClick={() => editHandler(mission.my_mission_id, mission.text)}>
                                        {mission.text}
                                    </div>
                                )}
                                        <IconWrapper className="icon-wrapper">
                                            <EditIcon onClick={() => editHandler(mission.my_mission_id, mission.text)}/>
                                            <DeleteIcon onClick={() => deleteHandler(mission.my_mission_id)} />
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

    &:not(.editing):hover {
        .icon-wrapper {
            display: flex;
        }
    }

    div {

        &.edit-form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

            &.editing-complete {
                width: 15px;
                height: 15px;
            }

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

    ${Mission}.editing & {
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

    ${Mission}:not(.editing):hover & {
        display: flex;
    }
`;

const EditIcon = styled(BsPencilSquare)`
    cursor: pointer;
`;

const DeleteIcon = styled(BsTrash3Fill)`
    cursor: pointer;
`;


const EditMission = styled.input`
    border: none;
    font-size: 15px;
    color: #BFBFBF;
    background-color: #D4E2F1;
    outline: none;
    width: 15rem;
    padding-left: 0px;
`;