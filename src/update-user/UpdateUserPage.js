import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { checkValidation } from '../add-user';
import { BackButton } from '../ui';


export const UpdateUserPage = () => {
const location = useLocation()
const navigate = useNavigate();
const { user } = location.state;
 //console.log(user);
const[ isFormValid, setIsFormValid]= useState(false);
const [checked, setChecked]= useState(false);
const [serverError, setServerError] = useState({});
const [inputValues, setInputValue] = useState({
  name: user.userName,
  phoneNum: user.phoneNum,
  email: user.email,
  password: "",
  newPassword:"",
  confirmNewPassword:"",
  
});

const [validation, setValidation] = useState({
  name: "",
  phoneNum: "",
  email: "",
  password: "",
  newPassword:"",
  confirmNewPassword:"",
  
});

//handle change updates
function handleChange(event) {
  const { name, value } = event.target;
  setInputValue({ ...inputValues, [name]: value });
}

useEffect(() => {
  let errors = {...validation};
  setValidation(errors);
  checkValidation(inputValues, errors,checked);
  
  if(!checked &&errors.name==="" && errors.phoneNum ==="" && errors.password===""){
    setIsFormValid(true)
  } else if (errors.name==="" && errors.phoneNum ==="" && errors.email==="" && errors.password==="" && errors.newPassword==="" && errors.confirmNewPassword==="" ){
    setIsFormValid(true);
  }else {
    setIsFormValid(false);
  }
 
}, [inputValues]);




const addToUsers = async () => {
const newUser = {
    ...inputValues,
    _id:user._id,
    userName: inputValues.name.toLowerCase(),
    phoneNum : inputValues.phoneNum,
    email: inputValues.email,
    password: inputValues.password,
    newPassword: inputValues.newPassword,
    checked: checked,
};
const response = await fetch('/users', {
    method : 'put',
    body: JSON.stringify(newUser),
    headers: {
        'Content-Type': 'application/json',
    },
});
const error = await response.json();
       // console.log(error);
        if(error==='ok'){
            navigate('/');
        }else {
            setServerError(error);
            setIsFormValid(false);
        }
}

const handleSubmit = (e) => {
e.preventDefault();
isFormValid
  ? addToUsers() 
  : console.log("enter valid details");
};

return(
<div className='page'>
    <BackButton />
    <div className='centered-container'>
        <h1>Edit User : </h1>
        <label>Name : </label>
        <input 
            type="text"
            name="name"
            placeholder='Enter Name'
            className='space-after space-before full-width'
            onChange={(e)=> handleChange(e)} 
            value={inputValues.name}
            />
           
            {validation.name && <p className='validation'>{validation.name}</p>}             
        <label>Email : </label>
        <input 
            disabled
            type='text'
            name="email"
            placeholder='Enter Email'
            className='space-after space-before full-width'
            onChange={(e) =>handleChange(e)} 
            value={inputValues.email}
            />
            {validation.email && <p className='validation'>{validation.email}</p>}       
        <label>Mobile : </label>
        <input 
            placeholder='Enter Mobile Number'
            type='number'
            name="phoneNum"
            className='space-after space-before full-width'
            onChange={(e) =>handleChange(e)} 
            value={inputValues.phoneNum}
            />      
            {validation.phoneNum && <p className='validation'>{validation.phoneNum}</p>}    
            <input
             type='password'
             name="password"
             placeholder='Enter your Password to continue'
             className='space-after space-before full-width'
             onChange={(e) => handleChange(e)}
             value={inputValues.password} />
               {validation.password && <p className='validation'>{validation.password}</p>} 
               {!isFormValid && <p className='validation'>{serverError.password}</p>}         
            <label>
              Do you want to change the password ?
        <input type="checkbox"
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
            />
            </label>
         {checked 
         ? <>
            <input
          type='password'
          name="newPassword"
          placeholder='Enter new Password '
          className='space-after space-before full-width'
          onChange={(e) => handleChange(e)}
          value={inputValues.newPassword} />
           {validation.newPassword && <p className='validation'>{validation.newPassword}</p>} 
          <input
          type='password'
          name="confirmNewPassword"
          placeholder='Re-Enter new Password '
          className='space-after space-before full-width'
          onChange={(e) => handleChange(e)}
          value={inputValues.confirmNewPassword} /> 
           {validation.confirmNewPassword && <p className='validation'>{validation.confirmNewPassword}</p>}  
          </> 
            : <br/>}     
        <button
            className='space-before full-width'
            onClick={handleSubmit}>Update</button> 
    </div>
</div>

);



}