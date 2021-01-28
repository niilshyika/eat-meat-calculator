const Card = ({ isEaten, icon, amount }) => {
    return (
      <div className="card">
        <img src={icon} className="card_icon" />
        <div className={`card_amount ${!isEaten ? "card_amount--green" : ""}`}>
          {amount}
        </div>
      </div>
    );
};

export default Card;