import './CustomInput.css';
import InputMask from "react-input-mask";

const CustomInput = ({type, name, id, label, placeholder, required, onChange, value}) => {
    const isCPF = name === 'cpf';
    const isPhone = name === 'phone';

    return (
        <div className="input-group defaultInputs">
            {isCPF || isPhone ? (
                <InputMask
                    mask= {isCPF ? "999.999.999-99" : "(99) 99999-9999"}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                >
                    {(inputProps) => <input {...inputProps} type={type} required={required}/>}
                </InputMask>
            ) : (
                <input type={type} name={name} id={id} placeholder={placeholder} required={required} onChange={onChange} value={value}/>
            )}
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomInput