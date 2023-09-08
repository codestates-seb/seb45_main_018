import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import { styled } from "styled-components";
import Button from "../atoms/Button";
import { completeMyMission } from "../../redux/slice/missionSlice";



interface MyMissionListProps {

}

function MyMissionList () {
    const dispatch = useDispatch();

    const myMissions = useSelector((state: RootState) => state.missions.myMissions);

    const missionDoneHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const missionId = parseInt(event.currentTarget.parentElement?.getAttribute("data-mission-id") || "", 10);

    if (!isNaN(missionId)) {
      // 미션 완료 액션 디스패치
      dispatch(completeMyMission(missionId));
    }
    }

    return (
        <Container>
            <MissionList>
                {myMissions.map((mission) => (
                    <Mission key={mission.id}
                        data-mission-id={mission.id}>{mission.text}
                    <DoneButton onClick={missionDoneHandler} />
                    </Mission>
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
`;

const DoneButton = styled(Button)`
    width: 15px;
    height: 15px;
    background-color: #FF9999;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #D4FFC0;
    }
`;