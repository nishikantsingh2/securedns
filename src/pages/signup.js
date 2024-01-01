import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import * as Yup from 'yup';
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import axios from 'axios';
import { base_url } from "@/util/baseUrl";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import Head from "next/head";


const Signup = () => {

    const router = useRouter()
    const { dispatch } = useContext(AuthContext);
    let schema = Yup.object().shape({



        email: Yup.string().email("Email should be valid").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, 'Password must be at least 6 characters long'),
        
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        mobile: Yup.string().required("Mobile number is required").matches(/^\d{10}$/, "Mobile number must be 10 digits"),
        firstname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastname: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),

    });
    const formik = useFormik({
        initialValues: {

            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            mobile: '',
        },
        validationSchema: schema,
        onSubmit: async (values) => {

           
            async function checkEmailExists(email) {
                try {
                  
                  const existingMethods = await auth.fetchSignInMethodsForEmail(email);
              
                  return existingMethods.length > 0; // True if email exists, false otherwise
                } catch (error) {
                  console.error("Error checking email existence:", error);
                  throw error; // Re-throw the error for proper handling in calling code
                }
              }
              
              

            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then(async (userCredential) => {
                    // Signed in
                    // updateProfile(auth.currentUser, {
                    //     displayName: values.password,
                    //     phoneNumber: values.password
                    // });

                    const user = userCredential.user;

                    const docRef = await addDoc(collection(db, "users"), {
                        firstname: values.firstname,
                        lastname: values.lastname,
                        email: values.email,
                        mobile: values.mobile,
                        uid: user.uid




                    });
                    toast("User created ")
                    router.push("/login")

                })
                .catch((error) => {
                    // setError(true);
                   console.log(error);
               
                   toast('Email is already exsit ')
                   
                });


        },
    });






    return (
        <>
         <Head>
        <meta charset="utf-8" />
        <meta name="author" content="Secure Dns" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />



        <title>Cyberpeace Secure Dns</title>


      </Head>
      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      />
            <div className="row bg">

            <h2 className="login-title header1 padding-50">CyberPeace Secure Dns</h2>
                {/* <div className="col-lg-4 col-sm-12"></div> */}
                <div className="col-lg-12 col-sm-12 padding-50">
                    <div >
                        <form onSubmit={formik.handleSubmit}>
                            <div className="login-title ">
                                <h2 className="login-title ">Sign Up</h2>
                            </div>
                            <div className="error " style={{ textAlign: "right",color:'#ff0000',fontWeight:'bolder',fontSize: '10px' }}>
                            {formik.touched.firstname && formik.errors.firstname}
                            </div>
                            <div className="form-field">
                                <input
                                    type="text"
                                    placeholder="First Name"

                                    onChange={formik.handleChange("firstname")}
                                />
                               
                            </div>
                            <div className="error " style={{ textAlign: "right",color:'#ff0000',fontWeight:'bolder',fontSize: '10px' }}>
                            {formik.touched.lastname && formik.errors.lastname}
                            </div>
                            <div className="form-field">
                                <input
                                    type="text"
                                    placeholder="Last Name"

                                    onChange={formik.handleChange("lastname")}
                                />
                            </div>
                            <div className="error " style={{ textAlign: "right",color:'#ff0000',fontWeight:'bolder',fontSize: '10px' }}>
                            {formik.touched.email && formik.errors.email}
                            </div>
                            <div className="form-field">
                                <input
                                    type="email"
                                    placeholder="Email / Username"

                                    onChange={formik.handleChange("email")}
                                />
                            </div>
                            <div className="error " style={{ textAlign: "right",color:'#ff0000',fontWeight:'bolder',fontSize: '10px' }}>
                            {formik.touched.mobile && formik.errors.mobile}
                            </div>
                            <div className="form-field">
                                <input
                                    type="text"
                                    placeholder="Mobile Number"

                                    onChange={formik.handleChange("mobile")}
                                />
                                 
                            </div>

                            

                            <div className="error " style={{ textAlign: "right",color:'#ff0000',fontWeight:'bolder',fontSize: '10px' }}>
                            {formik.touched.password && formik.errors.password}
                            </div>
                            <div className="form-field">
                                <input
                                    type="password"
                                    placeholder="Password"

                                    onChange={formik.handleChange("password")}

                                />
                            </div>
                            <div className="error " style={{ textAlign: "right",color:'#ff0000',fontWeight:'bolder',fontSize: '10px' }}>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword}
                            </div>
                            <div className="form-field">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"

                                    onChange={formik.handleChange("confirmPassword")}

                                />
                            </div>



                            <div className="form-field mt-3 mb-3">
                                <a href="/login" style={{ color: '#03feff' }}>Already have account ?</a>
                            </div>
                            {/* <div className="form-field">
                                <button className="btn" type="submit">Sign Up</button>
                            </div> */}
                         
                            <button className="themebutton1" type="submit">Sign Up</button>
                           
                            
                            

                        </form>

                    </div>
                </div>
                

            </div >




        </>
    )

}


export default Signup;