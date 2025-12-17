import Membres from "./Membres.jsx"
export default function Groupe(props){
    const {groupe}=props
    return <li className="item">
        <h2>Groupe {groupe.id}-{groupe.nomGroupe}</h2>
        <p>Liste des Members:</p>
        <Membres membres={groupe.membres}/>
    </li> 
}