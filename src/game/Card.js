const Card = ({ name, handleCards, toggled, stopflip, image }) => {
    return (
        <div className="card"> 
            <div className={toggled ? "toggled" : ""}>
                <img className="cardPic" src={image} alt={name} />
                <div 
                className="backOfCard" 
                onClick={() => !stopflip && handleCards(name)}
                >
                    {" "}
                </div>
            </div>
        </div>
    )
}

export default Card;