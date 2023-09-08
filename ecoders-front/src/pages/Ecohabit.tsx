// import { styled } from "styled-components";
// import { PiStarFourFill } from "react-icons/pi";
// import { FiSettings } from "react-icons/fi";
// import { MdOutlineKeyboardArrowUp, MdAdd } from "react-icons/md";
// import Button from "../components/atoms/Button";
// import MissionForm from "../components/atoms/MissionForm";
// import { useDispatch } from "react-redux";
// import { openModal } from "../redux/slice/modalSlice";
// import Modal from "../components/atoms/Modal";
// import { useEffect, useState } from "react";
// import MyMissionList from "../components/features/MyMissionList";
// import TodaysMissionList from "../components/features/TodaysMissionList";
// import { fetchTodaysMissions } from "../redux/slice/missionSlice";
// import logo from "../assets/Logo.png"

// function Ecohabit () {
//     const dispatch = useDispatch();

//     const [ isMissionFormVisible, setIsMissionFormVisible ] = useState(false);

//     const statusOpenHandler = () => {
//         dispatch(openModal("stampStatusModal"));
//     };

//     const settingOpenHandler = () => {
//         dispatch(openModal("settingModal"));
//     };

//     // 입력 창 보이는 핸들러
//     const addMissionHandler = () => {
//         setIsMissionFormVisible(!isMissionFormVisible);
//     };

//     // 리스트 리셋 핸들러
//     const resetMissionHandler = () => {

//     };

//     // 오늘의 미션 데이터 받아오기
//     // useEffect(() => {
//     //     const fetchMissions = async () => {
//     //         try {
//     //             const action = fetchTodaysMissions();
//     //             await dispatch(action);
//     //         } catch (error: any) {
//     //             console.error('에러', error)
//     //         }
//     //     };

//     //     fetchMissions();
//     // }, [dispatch]); //action type 오류 찾아보기...

//     return (
//         <Container>
//             <ContentsContiner>
//                 <StampContainer>
//                     <div>
//                         <Title>
//                             <PiStarFourFill style={{color: '#D3F169'}}/>
//                             Stamps of Week!
//                         </Title>
//                         <CommonButton
//                             className="my-stamp-status"
//                             onClick={statusOpenHandler}>나의 스탬프 현황</CommonButton>
//                     </div>
//                     <div className="week-stamps">
//                         주간 스탬프
//                     </div>
//                 </StampContainer>
//                 <CommonModal modalType="stampStatusModal">스탬프 현황 모달입니다.</CommonModal>
//                 <MyMissionContainer>
//                     <TitleBox>
//                         <Title>
//                             <PiStarFourFill style={{color: '#D3F169'}}/>
//                             나만의 미션!
//                         </Title>
//                         <div className="button-box">
//                             <CommonButton className="add-mission" onClick={addMissionHandler}>{!isMissionFormVisible ? (<MdAdd />) : (<MdOutlineKeyboardArrowUp />)}</CommonButton>
//                         </div>
//                         <div className="button-box">
//                             <CommonButton className="reset-mission"
//                                 onClick={resetMissionHandler}>R</CommonButton>
//                         </div>
//                     </TitleBox>
//                     {isMissionFormVisible && (
//                         <div>
//                             <MissionForm></MissionForm>
//                         </div>)}
//                     <MyMissionList />
//                 </MyMissionContainer>
//                 <TodayMissionContainer>
//                     <TitleBox>
//                         <Title>
//                             <PiStarFourFill style={{color: '#D3F169'}}/>
//                             오늘의 미션!
//                         </Title>
//                         <div className="setting-box"
//                             onClick={settingOpenHandler}>
//                             <FiSettings style={{color: '#CCCCCC'}} />
//                         </div>
//                     </TitleBox>
//                     <div className="todays-mission">
//                         <TodaysMissionList />
//                     </div>
//                 </TodayMissionContainer>
//                 <CommonModal modalType="settingModal">
//                     <ModalConent>
//                         <Logo src={logo} />
//                         <div className="text-content">오늘의 미션 갯수를 설정할 수 있습니다! 원하시는 갯수를 선택해 주세요! </div>
//                         <SelectBox>
//                             <Select>
//                                 <option value="one">1개</option>
//                                 <option value="two">2개</option>
//                                 <option value="three">3개</option>
//                                 <option value="four">4개</option>
//                                 <option value="five">5개</option>
//                             </Select>
//                         </SelectBox>
//                         <CommonButton className="setting-button">설정하기</CommonButton>
//                     </ModalConent>
//                 </CommonModal>
//             </ContentsContiner>
//         </Container>
//     )
// }

// export default Ecohabit;

// const Container = styled.section`
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
// `;

// const ContentsContiner = styled.div`
//     border-left: 1px solid black;
//     border-right: 1px solid black;
//     width: 60rem;
//     height: 100vh;
//     padding: 46px 24px;
//     display: flex;
//     flex-direction: column;
//     gap: 5rem;

// `;

// const StampContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;

//     div {
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         align-items: center;

//         &.week-stamps {
//             width: 650px;
//             height: 100px;
//             background-color: aliceblue;
//         }
//     }
// `;

// const MyMissionContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;

//     div {

//         &.button-box {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 30px;
//             height: 30px;
//             line-height: normal;
//             cursor: pointer;
//         }
//     }
// `;

// const TodayMissionContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1.5rem;

//     div {
//         &.setting-box {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 30px;
//             height: 30px;
//             text-align: center;
//             line-height: normal;
//             font-size: 25px;
//             cursor: pointer;
//         }

//         &.todays-mission {
//             height: 200px;
//             background-color: aliceblue;
//         }
//     }
// `;

// const CommonButton = styled(Button)`
//     text-align: center;
//     line-height: normal;

//     &.my-stamp-status {
//         width: 150px;
//         padding: 10px;
//         background-color: #000;
//         color: #fff;

//         &:hover {
//             background-color: #D4E2F1;
//         }
//     }

//     &.add-mission {
//         background-color: #D4E2F1;
//         border: none;
//         color: #fff;
//         font-size: 20px;
//     }

//     &.reset-mission {
//         background-color: #D4E2F1;
//         border: none;
//         color: #fff;
//     }

//     &.setting-button {
//         background-color: #7092BF;
//         color: #fff;
//         border: none;
//         padding: 16px;

//         &:hover {
//             background-color: #D4E2F1;
//         }
//     }
// `;

// const Title = styled.div`
//     font-size: 32px;
//     font-weight: 600;
//     line-height: normal;
// `;

// const TitleBox = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 1rem;
// `;

// const Logo = styled.img`
//     width: 115px;
// `;

// const SelectBox = styled.div`
//     width: 80px;
//     border-radius: 10px;
//     border: 1px solid #5A5A5A;
//     background: #FFF;
//     display: flex;
//     justify-content: center;
// `;

// const Select = styled.select`
//     width: 60px;
//     padding: 10px;
//     border: none;
// `;

// const CommonModal = styled(Modal)`
// `;

// const ModalConent = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 14px;

//     div {
//         &.text-content {
//             text-align: center;
//             font-size: 16px;
//             font-weight: 400;
//             line-height: normal;
//         }
//     }
// `