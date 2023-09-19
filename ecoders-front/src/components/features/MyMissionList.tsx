import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { styled } from "styled-components";
import Button from "../atoms/Button";
import { BsFillCheckCircleFill, BsPencilSquare, BsTrash3Fill } from "react-icons/bs";
import { FaCircleArrowUp } from "react-icons/fa6";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import axios from "axios";
import { deleteMission, fetchMyMissionsAsync, toggleMission, updateMissionText } from "../../redux/slice/myMissionSlice";

function MyMissionList () {
    const dispatch = useAppDispatch();

    const apiUrl = useSelector((state:RootState) => state.api.APIURL);
    const missions = useSelector((state: RootState) => state.myMissions.missions);



    const [ editedText, setEditedText ] = useState<string>('');
    const [ editedId, setEditedId ] = useState<number | null>(null);


    const inputRef = useRef<HTMLInputElement | null>(null);


    // 수정 모드로 가면 input창에 커서 포커스
    // 데이터 가져오기
    useEffect(() => {
        dispatch(fetchMyMissionsAsync());
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const toggleHandler = async (id: number) => {
        try {
            // 현재 미션 찾기
            const mission = missions.find((mission) => mission.id === id);

            if (mission) {
                // completed 값 변경
                const updatedCompleted = !mission.completed;

                // 서버 요청
                const response = await axios.patch(
                    `${apiUrl}/mission/my_mission/complete/${id}`, {
                        isCompleted: updatedCompleted,
                    },
                    {
                    headers: {
                        "Content-Type" : "application/json",
                        Authorization: `${localStorage.getItem('accessToken')}`,
                    },
                    }
                );

                if (response.status === 200) {
                    console.log(`미션 ${id}를 업데이트했습니다.`);
                    dispatch(toggleMission(id));
                } else {
                    console.error(`미션 ${id} 업데이트 오류가 발생했습니다.`);
                }
            }
        } catch (error) {
            console.error(`오류가 발생했습니다.`, error);
        }
    };

    const editHandler = (id: number) => {
        setEditedId(id);

        const editedMission = missions.find((mission) => mission.id === id);

        if (editedMission) {
            setEditedText(editedMission.text);
        }
    };

    const saveHandler = async (id: number) => {
        try {
            // 수정 텍스트 서버 업데이트
            const response = await axios.patch(
              `${apiUrl}/mission/my_mission/${id}`,
              {
                text: editedText,
              },
              {
                headers: {
                  Authorization: `${localStorage.getItem('accessToken')}`,
                },
              }
            );

            if (response.status === 200) {
              // 서버 요청 성공 -> redux 상태 업데이트
              console.log(`미션 ${id}를 업데이트했습니다.`);
              dispatch(updateMissionText({ id, text: editedText }));
              setEditedId(null);
              setEditedText('');
            } else {
              console.error(`미션 ${id}를 업데이트하는 중 오류가 발생했습니다.`);
            }
          } catch (error) {
            console.error(`오류가 발생했습니다.`, error);
          }
    };

    const deleteHandler = async (id: number) => {
        try {
            // 서버에서 삭제
            const response = await axios.delete(
              `${apiUrl}/mission/my_mission/${id}`,
              {
                headers: {
                  Authorization: `${localStorage.getItem('accessToken')}`,
                },
              }
            );

            if (response.status === 204) {
              console.log(`미션 ${id}를 삭제했습니다.`);
                // redux에서 삭제
                dispatch(deleteMission(id));
            } else {
              console.error(`미션 ${id}를 삭제하는 중 오류가 발생했습니다.`);
            }
          } catch (error) {
            console.error(`오류가 발생했습니다.`, error);
          }
    };

    return (
        <Container>
            <MissionList>
                {missions.map((mission) => (
                    <React.Fragment key={mission.id}>
                        {mission.completed ? (
                            <CompleteMission
                                onClick={() => toggleHandler(mission.id)}>
                                        {mission.text}
                                    <BsFillCheckCircleFill
                                        style ={{ color: '#D4FFC0' }}
                                        onClick={() => toggleHandler(mission.id)} />
                            </CompleteMission>
                        ) : (
                            <Mission
                                className={editedId === mission.id ? "editing" : ""}
                                data-mission-id={mission.id}
                                >
                                        {editedId === mission.id ? (
                                    <div className="edit-form">
                                        <EditMission
                                            type="text"
                                            value={editedText}
                                            onChange={(e) => setEditedText(e.target.value)}
                                            onBlur={() => saveHandler(mission.id)}
                                            onKeyUp={(e) => {
                                                if (e.key === "Enter") {
                                                  saveHandler(mission.id);
                                                }}}
                                            ref={inputRef}
                                        />
                                            <FaCircleArrowUp
                                                className="editing-complete"
                                                style={{color: '#CCCCCC'}}
                                                onClick={() => saveHandler(mission.id)} />
                                    </div>
                                ) : (
                                    <div onClick={() => toggleHandler(mission.id)}>
                                        {mission.text}
                                    </div>
                                )}
                                        <IconWrapper className="icon-wrapper">
                                            <EditIcon onClick={() => editHandler(mission.id)} />
                                            <DeleteIcon onClick={() => deleteHandler(mission.id)}/>
                                        </IconWrapper>
                                        <CompletedButton onClick={() => toggleHandler(mission.id)} />
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