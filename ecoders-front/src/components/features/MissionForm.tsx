import Input from "../atoms/Input";

interface MissionProps {
}


function MissionForm (props: MissionProps) {
    return (
        <div>
            <Input
                placeholder="미션 등록하기"></Input>
        </div>
    )
}

export default MissionForm;