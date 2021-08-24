import { MainPageContext } from '../../context/MainPageContext';

type Props = {
    className: string,
    value: string,
    setState: (value: string) => void,
}

const Choice = (props: Props) => {

    const doSetState = (event: any) => {
        event.stopPropagation();
        props.setState(props.value);
    }

    return (
        <div className={props.className} onClick={doSetState}>
            {props.value}
        </div>
    );
}

export default Choice;