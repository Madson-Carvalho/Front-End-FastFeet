import './CustomInput.css';

const CustomInput = ({type, name, id, label}) => {
    return (
        <div className="input-group defaultInputs">
            <input type={type} name={name} id={id}/>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomInput