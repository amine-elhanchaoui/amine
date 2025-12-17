import './members.css'
import Stagiaire from "./Stagiaire.jsx";
export default function Membres(props) {
    const { membres } = props
    let nbrStagiaire = membres.length;
    let avgnotes = membres.reduce((total, m) => total + m.moyenneBac,0) / nbrStagiaire;
    return (<div className='item'>
        <table border={1}>
        <thead>
            <tr>
                <th>Id</th>
                <th>Nom Complet</th>
                <th>avg Bac</th>
            </tr>
        </thead>
        <tbody>
        {
            membres.map(({ id, nom, prenom, moyenneBac }) =>
                <Stagiaire
                    id={id}
                    f_name={prenom}
                    l_name={nom}
                    moyenneBac={moyenneBac}
                />
            )
        }
        </tbody>
    </table>
    <p>nomber d'inscrits: {nbrStagiaire}   Moyenne total: {avgnotes}</p>
    </div>
    )
}