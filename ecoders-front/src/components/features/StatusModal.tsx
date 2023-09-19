import Modal from "../atoms/Modal";
import { styled } from "styled-components";
import MonthStamps from "./MonthStamps";

function StatusModal () {

    return (
        <>
            <ModalStyle modaltype="stampStatusModal">
                <ModalConent>
                    <MonthStamps />
                </ModalConent>
            </ModalStyle>
        </>
    )
}

export default StatusModal;

const ModalStyle = styled(Modal)<{$modaltype? : string}>`
    width: auto;
    height: auto;
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