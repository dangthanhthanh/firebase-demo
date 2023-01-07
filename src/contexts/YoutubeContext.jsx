import {createContext } from "react";
import {config} from "../config";

export const YoutubeContext=createContext({
    shareVideo:(url)=>{}
})
const youtubeURLPattern=/^((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)\/((watch\?v=)?([a-zA-Z0-9]{11}))(&.*)*$/;
const YoutubeProvider=({children})=>{
    const getvideoIDFormYoutube=(url)=>{
        return new Promise((resolve,reject)=>{
            const result=url.match(youtubeURLPattern)
            if(result===null){
                reject(new Error('youtube url not alid'));
            }
            resolve(result[6])
        })
    }
    const validateVideoId = (videoId) =>{
        return new Promise((resolve, reject)=>{
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${config.firebase.apiKey}`)
            .then((res)=>res.json())
            .then(data =>{
                    if(data.items.length === 0){
                        reject(new Error('youtube url not found'))
                    }
                    resolve(data)
            })
        })
    }
    const shareVideo=async(url)=>{
        const videoId=await getvideoIDFormYoutube(url)
        const youtubeData= await validateVideoId(videoId)
        console.log(youtubeData)
    }
    const value={shareVideo}
    return <YoutubeContext.Provider value={value}>
            {children}
        </YoutubeContext.Provider>
    
}
export default YoutubeProvider;

