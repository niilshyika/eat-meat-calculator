import manIcon from "../imgs/man.svg";

const LifeExpentancy = ({ restAge, localization }) => (
    <div className="life-block">
      <label>
        <div className="input-label">{localization.restOfLife}</div>
        <div className="life-block_wrapper">
          <img src={manIcon} className="life-block_icon" />
          <div className="life-block_amount">{restAge ? restAge : '—'}</div> 
        </div>
      </label>
    </div>
);

export default LifeExpentancy;