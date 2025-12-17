

function Stagiaire(props){
    //const {nom,prenom}=props
    const {attr}=props
    const diplomes=["liscens",'master',"doctora"];

    return <div>
        <h2>Salam Sidi {attr.nom} {attr.prenom} </h2>
        <ul>
            {diplomes.map((diplome,index) => <li key={index}>{diplome}</li>)}
        </ul>
    </div>
}


export default Stagiaire;

