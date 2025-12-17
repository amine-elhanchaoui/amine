import Groupe from "./Groupe.jsx";

export default function Groupes(props){
    const {groupes}=props
    return <ul>
        {
            groupes.map((groupe)=> 
                <Groupe groupe={groupe}/>
            )
        }
    </ul>
}