import React, {useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import '../../LoginView.css';
import {getSingleUserDetails} from '../../Services/LoginService';

const ShowSingleUser=()=>
{
    const [inventoryUser,setInventoryUser] = useState({
            username:"",
            personalName:"",
            password: "",
            email:"",
            role:"",
        });
        let navigate=useNavigate();

        const showUser=()=>{
            getSingleUserDetails().then(response=>{
                  setInventoryUser(response.data);  
                 });
          }
        useEffect(() => {
                  showUser();
                }, []);
         
          const returnBack=()=>{
             if(inventoryUser.role==='Manager')
              navigate('/ManagerMenu');  
            else if(inventoryUser.role==='Vendor')
              navigate('/VendorMenu');
            else if(inventoryUser.role==='Admin')
              navigate('/AdminMenu');
          }

          return(
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', backgroundColor:'#f4f6f9'}}>
              <div style={{
                padding:'40px',
                backgroundColor:'#ffffff',
                borderRadius:'12px',
                boxShadow:'0 6px 20px rgba(0,0,0,0.1)',
                width:'500px',
                textAlign:'left'
              }}>
                <h2 style={{
                  textAlign:'center',
                  fontWeight:'600',
                  letterSpacing:'1px',
                  color:'#333',
                  marginBottom:'25px'
                }}>
                  User Details
                </h2>
                <div style={{marginBottom:'15px'}}>
                  <label style={{fontWeight:'600', color:'#555'}}>User Id:</label><br/>
                  <label style={{color:'#333'}}>{inventoryUser.username}</label>
                </div>
                <div style={{marginBottom:'15px'}}>
                  <label style={{fontWeight:'600', color:'#555'}}>Personal Name:</label><br/>
                  <label style={{color:'#333'}}>{inventoryUser.personalName}</label>
                </div>
                <div style={{marginBottom:'15px'}}>
                  <label style={{fontWeight:'600', color:'#555'}}>Email:</label><br/>
                  <label style={{color:'#333'}}>{inventoryUser.email}</label>
                </div>
                <div style={{marginBottom:'15px'}}>
                  <label style={{fontWeight:'600', color:'#555'}}>Role:</label><br/>
                  <label style={{color:'#333'}}>{inventoryUser.role}</label>
                </div>
                <div style={{display:'flex', justifyContent:'center', marginTop:'30px'}}>
                  <button
                    className="btn btn-primary"
                    onClick={returnBack}
                    style={{
                      padding:'10px 25px',
                      borderRadius:'8px',
                      backgroundColor:'#007bff',
                      border:'none',
                      color:'white',
                      fontWeight:'500',
                      cursor:'pointer'
                    }}
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          );

};
export default ShowSingleUser;
