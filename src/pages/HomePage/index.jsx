import { useContext, useEffect } from "react"
import CardVideo from "../../components/cardVideo/CardVideo"
import { YoutubeContext } from "../../contexts/YoutubeContext"


const HomePage = () => {
    const {getYoutubeVideos}=useContext(YoutubeContext)
    useEffect(() => {
      getYoutubeVideos()
    }, [])
    
    return (
        <div style={{padding:"20px",margin:0, background:""}}>
            <CardVideo/>
            <CardVideo/>
            <CardVideo/>
        </div>
    )
}
export default HomePage;
