import './Card.css';

const Card = ({title, quantity, icon}) => {
    return (
        <>
            <div className="card">
                <div className='card-header'>
                    <span className="icon">
                        {icon}
                    </span>
                    <h4>{title}</h4>
                </div>
                <p>
                    {`${quantity} ${title} cadastrados(as)`}
                </p>
            </div>
        </>
    )
}

export default Card;