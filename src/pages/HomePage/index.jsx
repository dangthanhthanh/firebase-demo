import { signOut } from "firebase/auth"
import { useContext, useEffect } from "react"
import { Button } from "reactstrap"
import { YoutubeContext } from "../../contexts/YoutubeContext"
import { auth } from "../../libs/firebase"


const HomePage = () => {
    const {getYoutubeVideos}=useContext(YoutubeContext)
    const onLogout = async ()=>{
        await signOut(auth)
    }
    useEffect(() => {
      getYoutubeVideos()
    }, [])
    
    return <div>
        <Button >createUser</Button>
        <Button onClick={onLogout}>Logout </Button>
    </div>
}
export default HomePage;
