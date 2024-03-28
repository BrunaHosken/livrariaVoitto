import Logo from "../../assets/logo.png";
import "./TopBar.css"
export const TopBar=()=>{
    return (
    <div className="top-bar">
        <div className="logo">
            <img src={Logo} alt="Logo da Voitto"/>
        </div> 
        <div className="titulo">
            <h2>Livraria</h2>
        </div>
    </div>
    )
}


