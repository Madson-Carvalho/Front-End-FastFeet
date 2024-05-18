import './CustomInput.css';
import InputMask from "react-input-mask";

const CustomInput = ({type, name, id, label}) => {
    const isCPF = name === 'cpf';

    return (
        <div className="input-group defaultInputs">
            {isCPF ? (
                <InputMask
                    mask="999.999.999-99"
                    id={id}
                    name={name}
                >
                    {(inputProps) => <input {...inputProps} type={type} />}
                </InputMask>
            ) : (
                <input type={type} name={name} id={id} />
            )}
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomInput