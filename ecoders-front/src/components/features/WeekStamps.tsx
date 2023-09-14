import { styled } from 'styled-components';
import Stamp from './Stamp';


function WeekStamps() {
  // 현재 날짜 얻기
  const currentDate = new Date();

  // 현재 요일 확인 -> 0부터 6까지의 숫자 반환 -> 일~토
  const currentDay = currentDate.getDay();

  // 요일 문자열 배열 생성
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // 스탬프 데이터 값 가져오는 로직(짜야됨)


  return (
    <Container>
      <div className="el-container">
        {weekDays.map((day, index) => (
          <div className="el-box">
            <DayBox
              key={day}
              className={index === currentDay ? 'current-day' : ''}>
                {day}
            </DayBox>
            <Stamp
              key={day}
              isCurrentDay={index === currentDay}
              day={day}
            />
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


