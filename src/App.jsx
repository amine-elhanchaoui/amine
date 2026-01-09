import { BrowserRouter, Routes, Route, data } from 'react-router-dom'
import TaskDashbord from './Projects/To_Do_List/TaskDashbord'
import Navbar from './Routage/Navbar'
import Video from './Projects/Gallery/Video'
import Gallery from './Projects/Gallery/Gallery'
import Parent from './Projects/Habits_Gestion/Parent'
import Products from "./Projects/Components/Products"
import Formrouter from './Projects/Forms/Formrouter'
import Employee from './Projects/Forms/Employee.jsx'
import Form from './Projects/Forms/Form.jsx'
import dataCars from "./DATA/data.js"
import Home from './Routage/Home.jsx'
import Colorpicker from './Projects/Color Picker/Colorpicker.jsx'

// Client pages
import ListClient from './Clients/ListClient'
import AjouterClient from './Clients/AjouterClient'
import RechercheClient from './Clients/RechercheClient'





function App() {
  return(
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='ToDo-List' element={<TaskDashbord/>}/>
        <Route path='Vedio-gallery' element={<Video/>} />
        <Route path='Pitures-gallery' element={<Gallery/>} />
        <Route path='habits' element={<Parent/>}/>
        <Route path='Products' element={<Products products={dataCars}/>}/>
        <Route path='/Forms' element={<Formrouter/>}>
          <Route index element={<Form/>} />
          <Route path='Form' element={<Form/>} />
          <Route path='Employee' element={<Employee/>} />
        </Route>
        <Route path='/Color-Picker' element={<Colorpicker/>}></Route>

        {/* Client management routes */}
        <Route path='/listclient' element={<ListClient/>} />
        <Route path='/ajouterclient' element={<AjouterClient/>} />
        <Route path='/rechercheclient' element={<RechercheClient/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
