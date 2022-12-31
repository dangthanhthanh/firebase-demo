import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, facebookProvider, googleProvider } from "../libs/firebase";

export const AuthContext=createContext({
    currentUser:null,
    login:()=>{},
    logout:()=>{},
    regiter:()=>{},
    updateProfile:()=>{},

})
const AuthProvider=({children})=>{
    const [loading,setloading]=useState(true);
    const [currentUser,setCurrentUser]=useState(null);
    const updateProfileCurrentUser=async(displayName,photoURL)=>{
        const reponse=await updateProfile(currentUser,{
            displayName,
            photoURL,
        })
        setCurrentUser((pre)=>({...pre}))
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
        updateProfile:updateProfileCurrentUser

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
    return <AuthContext.Provider value={value}>{!loading? children:null}</AuthContext.Provider>
}
export default AuthProvider;