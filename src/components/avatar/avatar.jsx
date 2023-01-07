import { useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap"
const Avatar=({onChangeImage})=>{
  const [imageURL,setImageURL]=useState('/vite.svg')
  const onchange=(e)=>{
    const {files}=e.target;
    const path=URL.createObjectURL(files[0])
    setImageURL(path)
    onChangeImage(files[0])
  }
  useEffect (() => {
    //chay truoc khi copmonent unmount khoi trang
    //truoc khi change state
    return () => {
      URL.revokeObjectURL(imageURL)
    }
  }, [imageURL])
  
    return<FormGroup className="dl-flex justify-content-center">
    <Label for="Avatar" className="border rounded-circle">
        <img 
          src={imageURL} className="w-100" alt="photourl" />
    </Label>
      <Input type="file" id="avatar" onChange={onchange} accept='.jpg, .jpeg, .png'/>
  </FormGroup>
}
export default Avatar;