

function Etudiant(props){
    const {numinscri,nom,prenom,date}=props
    return <div>
        <p>id:{numinscri}/ nom:{nom} /prenom:{prenom} la date:{date}</p>
        {props.children}
    </div>

}


function ListEtudiant(props){
    const {etudiants}=props
    return <ul>
        {etudiants.map(({numinscri,nom,prenom,date},index)=> <li key={index}><Etudiant numinscri={numinscri} nom={nom} prenom={prenom} date={date}/></li>)}
    </ul>
}



// function ListEtudiant(props){
//     const {etudiants}=props
//     return <ul>
//         {etudiants.map(({numinscri,nom,prenom,date},index)=> <li key={index}> numinscri={numinscri} nom={nom} prenom={prenom} date={date}</li>)}
//     </ul>
// }


export default ListEtudiant;