import React, { Fragment, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';

import { FormControl, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Service } from '../../config/service';

import useAuth from '../../hooks/useAuth';
import { LoadingButton } from '@mui/lab';
const DistributeForm = () => {
const { register, handleSubmit, watch, setError, formState: { errors } } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");

 

  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false);

  const sendForm = async (data) => {
    setLoading(true)
    try {
      let phone = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/
      let email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      let obj = {
        password: data.password,
        email: '',
        phoneno: ''
      }
      if (data.emailorphone) {
        if (email.test(data.emailorphone)) {
          obj.email = data.emailorphone
        }
        else if (phone.test(data.emailorphone)) {
          obj.phoneno = data.emailorphone
        }
        else {
          setError("emailorphone", {
            type: 'custom',
            message: 'Entered value does not match email or phone no format',
          });
        }
      }

      const { response, status, message, Data } = await Service.signIn(obj)

      if (status === true && response === 200) {
        
        signIn(Data.name, Data.tokens, Data.image);
        toast.success(message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right top, #445f89, #4f859d, #7aa8a9, #b1c9bc, #e5e9de)",
        position: "relative",
        height: "100vh"
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(sendForm)}
        sx={{
          borderRadius: 3,
          bgcolor: " white",
          boxShadow: 9,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 350,
          padding: 6
        }}>
        <Typography variant="h4"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            fontFamily: "Barlow"
          }}>
         Add Distributor
        </Typography>
        <FormControl sx={{ marginY: 1, width: "100%" }}>

          <TextField label="Distributor ID" variant="outlined" type="text"
            {...register('email', {
              required: "Please Enter ID",

            })}
          />
          {errors.email && <span role="alert" style={{ color: 'red' }}>{errors.email.message}</span>}
        </FormControl>
        <FormControl sx={{marginY: 1}} fullWidth>
                    <TextField fullWidth label="Distributor Name" variant="outlined" type="text" 
                   
                    //   {...register("password", {
                    //     required: "required",
                    //     minLength: {
                    //       value: 5,
                    //       message: "min length is 6"
                    //     }
                    //   })}

                    />                  
          {errors.password && <span role="alert" style={{ color: 'red' }}>{errors.password.message}</span>}
        </FormControl>
        <FormControl sx={{marginY: 1}} fullWidth>
                    <TextField fullWidth label="Distributor Address" variant="outlined" type="text" InputProps={{ disableUnderline: true }}
                   
                    //   {...register("password", {
                    //     required: "required",
                    //     minLength: {
                    //       value: 5,
                    //     //   message: "min length is 6"
                    //     }
                    //   })}

                    />                  
          {errors.password && <span role="alert" style={{ color: 'red' }}>{errors.password.message}</span>}
        </FormControl>
        <FormControl fullWidth>
                    <TextField fullWidth label="Distributor Phone" variant="outlined" type="number" InputProps={{ disableUnderline: true }}
                   
                    //   {...register("password", {
                    //     required: "required",
                    //     minLength: {
                    //       value: 5,
                    //       message: "min length is 6"
                    //     }
                    //   })}

                    />                  
          {errors.password && <span role="alert" style={{ color: 'red' }}>{errors.password.message}</span>}
        </FormControl>
        <LoadingButton loading={loading}  type='submit' variant="contained"
          sx={{
            backgroundImage: "linear-gradient(to right top, #445f89, #4f859d, #7aa8a9, #b1c9bc, #e5e9de)",
            borderRadius: 1.5,
            p: 1.5, width: "100%",
            marginTop: 4,
            // bgcolor: "#3B5998"
          }}>
          Submit
        </LoadingButton>

      </Box>
    </Box>
  );
}

export default DistributeForm;
