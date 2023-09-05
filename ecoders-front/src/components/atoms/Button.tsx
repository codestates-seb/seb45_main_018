import styled from "styled-components";

// 받을 Props 설정
// ?를 사용하는 이유는 재사용 시 속성 값을 주지 않을 수 있기 때문 -> ?  없으면 오류 남
interface ButtonType {
    width?: string;
    height?: string;
    border? : string;
    borderRadius?: string;
    bgColor?: string;
    hoverBgColor?: string;
    color?: string;
    hoverColor?: string;
    fontSize?: number;
    children?: string;
    weight?: string;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button (props: ButtonType) {
    return (
        // {...props} 는 props로 받은 속성들을 styled component에 넘겨주는 역할
        <CommonButton {...props} onClick={props.onClick}>{props.children}</CommonButton>
    );
}

export default Button;

const CommonButton = styled.button<ButtonType>`
    cursor: pointer;
    font-weight: 600;
    /* {(props) => (props.속성값 ? props.속성값 : '100%')}
    props에 값이 있으면 ? 설정한 값으로 나오고 : 아니면 디폴트로 지정한 값으로 나옴 */
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '10rem')};
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '100%')};
    border: ${(props) => (props.border ? props.border : '1px solid black')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '1rem')};
    background-color: ${(props) => (props.bgColor ? props.bgColor : 'white')};
    color: ${(props) => (props.color ? props.color : 'black')};

    &:hover {
        border: none;
        background-color: ${(props) => (props.hoverBgColor ? props.hoverBgColor : 'black')};
        color: ${(props) => (props.hoverColor ? props.hoverColor : 'white')};
    }
`;
