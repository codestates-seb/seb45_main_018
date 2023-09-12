import Modal from "../atoms/Modal";
import { styled } from "styled-components";




function StatusModal () {


    return (
        <>
            <ModalStyle modaltype="stampStatusModal">
                <ModalConent>
                    <div>스탬프 모달입니다.</div>
                </ModalConent>
            </ModalStyle>
        </>
    )
}

export default StatusModal;

const ModalStyle = styled(Modal)<{$modaltype? : string}>`
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