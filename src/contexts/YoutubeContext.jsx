import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import {createContext, useContext } from "react";
import {config} from "../config";
import { db } from "../libs/firebase";
import { AuthContext } from "./AuthContext";

export const YoutubeContext=createContext({
    shareVideo:(url)=>{},
    getYoutubeVideos:()=>{}
})
const youtubeURLPattern=/^((http|https)\:\/\/)?(www\.youtube\.com|youtu\.?be)\/((watch\?v=)?([a-zA-Z0-9]{11}))(&.*)*$/;
const YoutubeProvider=({children})=>{
    const {currentUser}=useContext(AuthContext)
    const getYoutubeVideos=async()=>{
        const videoRef=collection(db,'video');
        const querySnapshot=await getDocs(videoRef);
        const youtubeData=[]
        querySnapshot.forEach((doc)=>{
            youtubeData.push(doc.data())
        })
        const videoIds=youtubeData.map((items)=>items.videoId)
        const videos=await validateVideoId(videoIds)
        console.log(videos)
    }
    const getvideoIDFormYoutube=(url)=>{
        return new Promise((resolve,reject)=>{
            const result=url.match(youtubeURLPattern)
            if(result===null){
                reject(new Error('youtube url not valid'));
            }
            resolve(result[6])
        })
    }
    const validateVideoId = (videoId) =>{
        let idParams
        console.log(videoId)

        if(typeof videoId === 'string'){
            idParams = `&id=${videoId}`
        }else{
            idParams = videoId.map(item => `&id=${item}`).join('')
            console.log(idParams)
        }
        return new Promise((resolve, reject)=>{
            console.log(idParams)
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idParams}&key=${config.firebase.apiKey}`)
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
        await validateVideoId(videoId)
        const videoRef= collection(db, 'video')
        const data = {
            videoId,
            createBy: currentUser.uid
        }
        await addDoc(videoRef, data)

    }
    const value={shareVideo,getYoutubeVideos}
    return <YoutubeContext.Provider value={value}>
            {children}
        </YoutubeContext.Provider>
    
}
export default YoutubeProvider;

