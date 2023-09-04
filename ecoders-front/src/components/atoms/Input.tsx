import styled from "styled-components";

interface InputType {
    width?: string;
    fontSize?: string;
    weight?: string;
    height?: string;
    color?: string;
    bgColor?: string;
    children?: string;
    placeholder?: string;
    value?: string;
    type?: string;
    borderStyle?: string;
    borderWidth?: string;
    padding?: string;
    className?: string;
    name?: string;
    onChange?: (e: any) => void;
}

function Input (props: InputType) {
    return (
        <InputBox {...props} />
    )
}

export default Input;

const InputBox = styled.input<InputType>`
    padding: ${(props) => (props.padding ? props.padding : '8px 8px')};
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '100%')};
    border-style: ${(props) => (props.borderStyle ? props.borderStyle : 'none none solid none')};
    border-width: ${(props) => (props.borderWidth ? props.borderWidth : '0.5px')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '1rem')};
    background-color: ${(props) => (props.bgColor ? props.bgColor : 'white')};
    color: ${(props) => (props.color ? props.color : 'black')};

    &:focus {
        outline: none;
    }
`