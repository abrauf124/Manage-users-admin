import React , {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton} from '../ui';
import { checkValidation } from './checkValidation';


export const AddUserPage = () => {
        const navigate = useNavigate();
        const[ isFormValid, setIsFormValid]= useState(false);
        const [serverError, setServerError] = useState({});
        const [inputValues, setInputValue] = useState({
          name: "",
          phoneNum: "",
          email: "",
          password: "",
          confirmPassword: "",
          
        });
      
        const [validation, setValidation] = useState({
          name: "",
          phoneNum: "",
          email: "",
          password: "",
          confirmPassword: "",
          
        });
      
        //handle change updates
        function handleChange(event) {
          const { name, value } = event.target;
          setInputValue({ ...inputValues, [name]: value });
        }
      
       
        
      
        useEffect(() => {
          let errors = {...validation};
          setValidation(errors);
          checkValidation(inputValues, errors,false);
          
          errors.name==="" && errors.phoneNum ==="" && errors.email==="" && errors.password ==="" &&errors.confirmPassword === ""
          ? setIsFormValid(true)
          : setIsFormValid(false);
        }, [inputValues]);
      

      

    const addToUsers = async () => {
        const newUser = {
            ...inputValues,
            userName: inputValues.name.toLowerCase(),
            phoneNum : inputValues.phoneNum,
            email: inputValues.email,
            password: inputValues.password,
        };
       const response= await fetch('/users', {
            method : 'post',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const error = await response.json();
        console.log(error);
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
                <h1>Add User</h1>
                
                <input 
                    type="text"
                    name="name"
                    placeholder='Enter Name'
                    className='space-after space-before full-width'
                    onChange={(e)=> handleChange(e)} 
                    value={inputValues.name}
                    />
                    {validation.name && <p className='validation'>{validation.name}</p>}  
                    
                <input 
                    type='text'
                    name="email"
                    placeholder='Enter Email'
                    className='space-before space-after full-width'
                    onChange={(e) =>handleChange(e)} 
                    value={inputValues.email}
                    />
                    {validation.email && <p className='validation'>{validation.email}</p>}
                
                <input 
                    placeholder='Enter Mobile Number'
                    type='number'
                    name="phoneNum"
                    className='space-before space-after full-width'
                    onChange={(e) =>handleChange(e)} 
                    value={inputValues.phoneNum}
                    />
                    {validation.phoneNum && <p className='validation'>{validation.phoneNum}</p>}  
                
                <input 
                    type='password'
                    name="password"
                    placeholder='Enter Password'
                    className='space-before space-after full-width'
                    onChange={(e) => handleChange(e)}
                    value={inputValues.password}
                     />  
                    {validation.password && <p className='validation'>{validation.password}</p>}     

                <input 
                    type='password'
                    name="confirmPassword"
                    placeholder='Re-Enter Password'
                    className='space-before space-after full-width'
                    onChange={(e) => handleChange(e)}
                    value={inputValues.confirmPassword}
                     />  
                    {validation.confirmPassword && <p className='validation'>{validation.confirmPassword}</p>}

                <button
                    className='space-before full-width'
                    onClick={handleSubmit}>Add</button> 
                    {!isFormValid && <p className='validation'>{serverError.email}</p>} 
               
            </div>
        </div>

    );



};