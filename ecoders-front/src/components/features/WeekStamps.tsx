import { styled } from 'styled-components';
import Stamp from './Stamp';
// import { useAppDispatch } from '../../redux/hooks/useAppDispatch';
// import { RootState } from '../../redux/store/store';
// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// import { fetchStampsAsync } from '../../redux/slice/stampSlice';


function WeekStamps() {
   // const dispatch = useAppDispatch();

    const fakeStampsData = [
        { date: "2023-09-01 08:00:00", count: 0 },
        { date: "2023-09-02 14:30:00", count: 1 },
        { date: "2023-09-03 10:15:00", count: 2 },
        { date: "2023-09-04 16:45:00", count: 0 },
        { date: "2023-09-05 12:20:00", count: 3 },
        { date: "2023-09-06 09:10:00", count: 0 },
        { date: "2023-09-07 18:00:00", count: 4 },
      ];

      const completes = fakeStampsData;

    // const stamps = useSelector((state: RootState) => state.stamps.stamps);

    // 데이터 받아오기
    // useEffect(() => {
    //     dispatch(fetchStampsAsync());
    // }, [])

    // 현재 날짜 얻기
    const currentDate = new Date();
    console.log(currentDate)

    // 현재 요일 확인 -> 0부터 6까지의 숫자 반환 -> 일~토
    const currentDay = currentDate.getDay();
    console.log(currentDay)

    // 요일 문자열 배열 생성
    const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // 스탬프 데이터 값 가져오는 로직
    // 이미 fetchStampAsync로 스탬프 값을 가져옴
    const [ completesCounts, setCompletesCounts ] = useState<number[]>([]);

    completesCounts[currentDay] = 0;

    useEffect(() => {
        const counts = weekDays.map((_, index) => {
            const complete = completes.find((complete) => {
                const completeDay = new Date(complete.date).getDay();
                return completeDay === index;
            });
            return complete ? complete.count : 0;
        });
        setCompletesCounts(counts);
    }, []);



    return (
        <Container>
        <div className="el-container">
            {weekDays.map((day, index) => (
            <div className="el-box" key={day}>
                <DayBox
                key={day}
                className={index === currentDay ? 'current-day' : ''}>
                    {day}
                </DayBox>
                {completesCounts[index] >= 0 && (
                    <Stamp count={completesCounts[index]} key={`stamp-${day}`} />
                )}
            </div>
            ))}
        </div>
        </Container>
    );
}

export default WeekStamps;

const Container = styled.div`
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div {
        &.el-container {
        display: flex;
        flex-direction: row;
        }

        &.el-box {
        display: flex;
        flex-direction: column;
        }
    }
`;


const DayBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: 500;
    padding: 2px;

    &.current-day {
        background-color: #D4E2F1;
        border-radius: 50%;

  }
`;


