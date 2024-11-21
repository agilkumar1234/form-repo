import React, { useState } from 'react'
import "./Main.css"
import { Fields } from './data'
import { IoMoonOutline } from "react-icons/io5";
const Main = () => {
  const[mainobject,setMainobject]=useState({});
  const[array,setArray]=useState([]);
  const [errors, setErrors] = useState({});
  const[dark,setDark]=useState(false);
  const handleclick=(name,value)=>{
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setMainobject((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      
      if (!value) {
        updatedErrors[name] = "This field is required";
      } else if (name === "email" && !pattern.test(value)) {
       
        updatedErrors[name] = "Please enter a valid email address";
      } else {
        
        delete updatedErrors[name];
      }

      return updatedErrors;
    });
  };
  const handleSubmit = () => {
    setArray((prevArray) => [...prevArray, mainobject]);
    console.log(array);
    alert("successfully submitted")
    setMainobject({});
  };
  const handleCopy = () => {
    
    const jsonString = JSON.stringify(array, null, 2);

    
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        alert('Array data copied to clipboard!');
      })
      .catch((err) => {
        alert('Failed to copy: ', err);
      });
  };
  return (
    <div className='mainContainer'>
        <div className='leftContainer'>
          <h2>Dynamic form generator</h2>
        <div className='fields'>
        {Fields.map((f) => (
          <div style={{width:"60%",height:"fit-content",display:"flex",flexDirection:"column",gap: "0.5rem"}}>
  <div className="inputcontainer" style={{flexDirection:f.type==="radio"?"row":"column",alignItems:f.type==="radio"?"center":"start",width:f.type==="radio"?"10rem":"20rem"}} key={f.id}>
    <p style={{fontSize:"1rem",color:"white"}}>{f.label}</p>
    {f.type === "select" ? (
      <select required={f.required} className="value"  name={f.id}  onChange={(e)=>{handleclick(f.id,e.target.value)}}>
        {f.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={f.type}
        placeholder={f.placeholder}
        required={f.required}
        className="value"
        name={f.id}
        onChange={(e)=>{handleclick(f.id,e.target.value)}}
      />
    )}

      {errors[f.id] && <p style={{ color: "red",fontSize:"0.8rem",marginTop: "0.2rem" }}>{errors[f.id]}</p>}
   
  </div>
 

  
  </div>
))}
<button onClick={()=>{handleSubmit()}}>Submit</button>
        </div>
        </div>
        <div className='rightContainer' style={{color:dark?"white":"black",background:dark?"black":"white"}}>
        <IoMoonOutline className='dark' onClick={()=>setDark(!dark)} style={{color:dark?"white":"black"}}/>
        <h2>Preview the form</h2>
        {Object.entries(mainobject).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
        <p>submit form with data console log to view data</p>
        <button className='copy' onClick={()=>{handleCopy()}}>click to copy all data</button>
        </div>
      
    </div>
  )
}

export default Main
