export default function Header(){
    return <div className=" d-flex row">
        <img src="../../public/imgs/logo.jpg" alt="logo" className="w-25 m-2 col "/>
        <span className="icon "><img src=".../../public/imgs/icon.svg" alt="" /></span><input type="search" name="s" id="s"className="form-control m-2 col" />
        <ul className=" m-2 p-2 list-unstyled d-flex align-item-center col m-auto">
            <li className=""><a className="text-light btn btn-primary m-3" href="#">Home</a></li>
            <li className=""><a className="text-light btn btn-primary m-3" href="#">About</a></li>
            <li className=""><a className="text-light btn btn-primary m-3" href="#">Help</a></li>
            <li className=""><a className="text-light btn btn-primary m-3" href="#">Products</a></li>
        </ul>
    </div>
}