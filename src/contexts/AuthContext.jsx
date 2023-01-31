import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db, facebookProvider, googleProvider, Storage } from "../libs/firebase";
import {getDownloadURL, ref,uploadBytes} from 'firebase/storage'
import { Spinner } from "reactstrap";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
    const creactUser=async(user)=>{
        const data={
            displayName:user.displayName,
            email:user.email,
            photoURL:user.photoURL,
            id:user.uid
        }
        const userRef=doc(db,'user',user.uid)
        const document=await setDoc(userRef,data)
        console.log(document)
    }
    const creactUserIfNotExit=async(user)=>{
        const userRef=doc(db,'user',user.uid)
        const docSnap=await getDoc(userRef)
        if(docSnap.exists()){
            return docSnap.data()
        }
        creactUser(user)
    }
    const uploadAvatarToStorage=async(file)=>{
        const storageRef = ref(Storage, `avatar/${currentUser.email}`);
        const snapshot= await uploadBytes(storageRef, file);
        return snapshot.ref
    }
    const updateProfileCurrentUser=async(displayName,photoURL)=>{
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
        onAuthStateChanged(auth,async(user)=>{
            if(user){
                await creactUserIfNotExit(user)
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