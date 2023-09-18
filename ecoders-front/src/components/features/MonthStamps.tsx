import { useState } from "react";
import Calendar from "react-calendar";
import Stamp from "./Stamp";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type StampData = {
    [key: string]: { completedMissionCount: number };
};

function MonthStamps () {
    const [ value, onChange ] = useState<Value>(new Date());

    // 임시데이터
    const stampData: StampData = {
        "2023-09-13": { completedMissionCount: 3 },
        "2023-09-12": { completedMissionCount: 1 },
        "2023-09-11": { completedMissionCount: 0 },
    };

    // 모든 날짜에 대한 초기 데이터 생성
    const startDate = new Date("1980-09-01");
    const endDate = new Date("2200-09-30");

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        const dateKey = date.toISOString().split('T')[0];
        stampData[dateKey] = { completedMissionCount: 0 };
    }

    // 실제 데이터를 업데이트
    stampData["2023-09-13"].completedMissionCount = 3;
    stampData["2023-09-12"].completedMissionCount = 1;

    const renderStamps = ({ date }: { date: Date; view: string}) => {
        const dateKey = date.toISOString().split('T')[0];
        const stampInfo = stampData[dateKey];

        if (stampInfo) {
            return (
                <div>
                    <Stamp completedmissionscount={stampInfo.completedMissionCount}/>
                </div>
            )
        }
    }

  return (
    <div>
        <Calendar
            onChange={onChange}
            value={value}
            tileContent={renderStamps} />
    </div>
  );
}

export default MonthStamps;