import { styled } from "styled-components";
import { FaCircleArrowUp } from "react-icons/fa6";
import Input from "./Input";
import { useState } from "react";
import { addMissionAsync } from "../../redux/slice/myMissionSlice";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";


function MissionForm () {
    const dispatch = useAppDispatch();

    const [ text, setText ] = useState<string>('');

    const addMissionHandler = () => {
        if (text.trim() !== '') {
            dispatch(addMissionAsync(text)); // 서버에 잘 감
            console.log(text)
            setText('');
        }
    }


    return (
        <Container>
            <MissionInput
            placeholder="미션을 입력해주세요."
            value={text}
            onChange={(e) => setText(e.target.value)}/>
            <div className="button-box" onClick={addMissionHandler}>
                <FaCircleArrowUp style={{color: '#CCCCCC'}}/>
            </div>
        </Container>
    )
}

export default MissionForm;

const Container = styled.div`
    width: 300px;
    height: 30px;
    padding: 30px 20px;
    background-color: #D4E2F1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;

    div {
        &.button-box {
            width: 20px;
            height: 20px;
            font-size: 20px;
        }
    }
`;

const MissionInput = styled(Input)`
    background-color: #D4E2F1;
    border: none;
    width: 15rem;
    padding-left: 0px;
`;