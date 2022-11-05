import Button from "react-bootstrap/Button";

function ButtonAll(props) {
    return (
        <Button className={props.className} variant="outline-light" hidden={props.state} onClick={props.handler}>{props.message}</Button>
    );
}


export default ButtonAll;
