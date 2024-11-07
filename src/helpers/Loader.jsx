import { Spinner } from "@telegram-apps/telegram-ui"
import LoaderSVG from "./../assets/images/loader.svg"


const Loader = () => {
    return (
        <div style={{width:"100%", height:"100vh", display:"flex", alignItems:"center", justifyContent:'center'}}>
            <img src={LoaderSVG} style={{width:"60px", height:"60px"}}/>
        </div>
    )
}

export default Loader