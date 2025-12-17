
export default function Stagiaire(props){
   const {id,f_name,l_name,moyenneBac}=props
   return <tr border='1'>
    <td>{id}</td>
    <td>{f_name} {l_name}</td>
    <td>{moyenneBac}</td>
   </tr>
}