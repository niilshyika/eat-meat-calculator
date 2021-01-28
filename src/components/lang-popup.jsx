const LangPopup = ({onSelectLang, items, active}) => (
    <div className="header_local-popup">
     {items.map(item => (
       <div
        className={`header_local-item ${ item === active ?  'header_local-item--active': ''}`}
        onClick={() => onSelectLang(item)}
       >{item}</div>
     ))}
    </div>
);

export default LangPopup