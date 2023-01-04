import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, facebookProvider, googleProvider, Storage } from "../libs/firebase";
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import { Spinner } from "reactstrap";

export const AuthContext=createContext({
    currentUser:null,
    login:()=>{},
    logout:()=>{},
    regiter:()=>{},
    updateProfile:()=>{},
    uploadAvatarToStorage:()=>{},

})
const AuthProvider=({children})=>{
    const [loading,setloading]=useState(true);
    const [currentUser,setCurrentUser]=useState(null);

    const uploadAvatarToStorage=async(file)=>{
        const storageRef = ref(Storage, `avatar/${currentUser.email}`);
        const snapshot= await uploadBytes(storageRef, file);
        return snapshot.ref
    }
    const updateProfileCurrentUser=async(displayName,photoURL)=>{
        //b1:lay photourl
        const ref=await uploadAvatarToStorage(photoURL);
        const photoUrl=await getDownloadURL(ref)
        await updateProfile(auth.currentUser,{
            displayName,
            photoURL:photoUrl,
        })
        setCurrentUser((pre)=>({...pre,displayName,photoURL}))
    }
    const register=async(email,password)=>{
        await createUserWithEmailAndPassword(auth,email,password)
    }
    const login=async(type,email,password)=>{
        switch(type){
            case 'google':
                await signInWithPopup(auth,googleProvider);
                break;
            case 'facebook':
                await signInWithPopup(auth,facebookProvider);
                break;
            case 'twitter':
                break;
            default:
                await signInWithEmailAndPassword(auth,email,password)    
                break;
        }
    }
    const logout= async()=>{await signOut(auth)}
    const value={
        currentUser,
        login:login,
        logout,
        register,
        updateProfile:updateProfileCurrentUser,
        uploadAvatarToStorage,

    }
    useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setCurrentUser(user)
            }else{
                setCurrentUser(null)
            }
            setloading(false)
        })
    }, [])
    return <AuthContext.Provider value={value}>{!loading? children:<Spinner/>}</AuthContext.Provider>
}
export default AuthProvider;