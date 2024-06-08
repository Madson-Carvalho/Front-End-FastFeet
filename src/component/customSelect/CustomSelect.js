import './CustomSelect.css';

const CustomSelect = ({ name, id, options, label, onChange}) => {
    return (
        <div className="input-group defaultInputs">
            <select name={name} id={id} onChange={onChange}>
                <option value={''}>-- Selecione uma opção --</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.name}</option>
                ))}
            </select>
            <label className="label" htmlFor={id}>{label}</label>
        </div>
    )
}

export default CustomSelect