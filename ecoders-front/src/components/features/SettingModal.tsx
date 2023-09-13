import Modal from "../atoms/Modal";
import Button from "../atoms/Button";
import logo from "../../assets/Logo.png"
import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { setTodayMissions } from "../../redux/slice/missionSlice";



function SettingModal () {
    const dispatch = useAppDispatch();

    const [ option, setOption ] = useState("five");

    const optionChangeHandler = (e: any) => {
        setOption(e.target.value);
    };

    const optionSubmitHandler = async () => {
        try {
            const response = await axios.post("api 주소", {
                option: option,  // 개수에 대한 변수명임
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            dispatch(setTodayMissions(response.data.todayMissions));
        } catch (error) {
            console.error("옵션 설정 중 에러가 발생했습니다.", error);
        }

    };

    return (
        <>
            <ModalStyle modaltype="settingModal">
                <ModalConent>
                    <Logo src={logo} />
                    <div className="text-content">오늘의 미션 갯수를 설정할 수 있습니다! 원하시는 갯수를 선택해 주세요! </div>
                    <SelectBox>
                        <Select id="mission-selector" value={option} onChange={optionChangeHandler}>
                            <option value="one">1개</option>
                            <option value="two">2개</option>
                            <option value="three">3개</option>
                            <option value="four">4개</option>
                            <option value="five">5개</option>
                        </Select>
                    </SelectBox>
                    <CommonButton className="setting-button"
                        onClick={optionSubmitHandler}>설정하기</CommonButton>
                </ModalConent>
            </ModalStyle>
        </>
    )
}

export default SettingModal;

const ModalStyle = styled(Modal)`
`;

const ModalConent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 14px;

    div {
        &.text-content {
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            line-height: normal;
        }
    }
`;

const CommonButton = styled(Button)`
    text-align: center;
    line-height: normal;

    &.setting-button {
        background-color: #7092BF;
        color: #fff;
        border: none;
        padding: 16px;

        &:hover {
            background-color: #D4E2F1;
        }
    }
`;

const Logo = styled.img`
    width: 115px;
`;

const SelectBox = styled.div`
    width: 80px;
    border-radius: 10px;
    border: 1px solid #5A5A5A;
    background: #FFF;
    display: flex;
    justify-content: center;
`;

const Select = styled.select`
    width: 60px;
    padding: 10px;
    border: none;
`;
