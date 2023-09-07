import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { closeModal } from "../../redux/slice/modalSlice";

interface ModalType {
    children? : any;
    className?: string;
}

function Modal (props: ModalType) {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <>
        {isOpen && (
            <Container>
                <Overlay onClick={handleClose}/>
                <Content {...props}>
                    <IconBox>
                        <FiX className="close-icon" onClick={handleClose}/>
                    </IconBox>
                    <TextBox>{props.children}</TextBox>
                </Content>
            </Container>
        )}
        </>
    )
};

export default Modal;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    z-index: 1;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
`;

const Content = styled.section`
    display: flex;
    flex-direction: column;
    width: 20rem;
    max-height: 20rem;
    background-color: #fff;
    border-radius: 30px;
    padding: 2rem;
    z-index: 1;
    overflow: auto;
`;

const IconBox = styled.div`
    display: flex;
    justify-content: flex-end;

    .close-icon {
        cursor: pointer;
    }
`
const TextBox = styled.div`
`;