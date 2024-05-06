import React, {useState} from "react";
import img from '../assets/00001.png';
import './css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button } from 'antd';
import {auth} from '../firebase'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SignUp(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    async  function handleChange(){
        createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
           console.log(userCredential)
            navigate('/login')
        }).catch(err=>{
            console.log(err)
        })
        
        }
    return(
        <div className="login" style={{background:'#ffc6dd'}}>
            <Row>
                <Col  style={{padding:'4rem',width:"15%", marginLeft:'6rem'}}>
                <img src={img} width={400} height={500}/>
                </Col>
                <Col>
                <div className="form" style={{paddingTop:'14rem', marginRight:30}} >
            <h1 style={{color:'black',marginLeft:'6rem'}}>Cinematic Flik</h1>
           <div style={{width:'26rem', padding:8,display:'flex'}}>
           <Input style={{ marginRight:20, padding:8}} onChange={(e)=>
        setEmail(e.currentTarget.value)} placeholder="Enter Email Address"/>
            <Input style={{ padding:10}} onChange={(e)=>
        setPassword(e.currentTarget.value)}  placeholder="Enter Password"/>
           </div>
           <Input style={{width:'26rem', padding:8, marginBottom:15 }}  placeholder="Enter Full Name"/>
            <Button style={{width:'26rem', display:"flex",justifyContent:"center", alignItems:"center" , padding:18}} onClick={handleChange}variant="outline-secondary">Join the Club</Button>
            <div style={{display:"flex", justifyContent:'center', marginTop:25, marginRight:'13rem'}}>Already a member<span onClick={()=>navigate('/login')} style={{color:'blue',cursor:'pointer'}}>Click Here</span></div>
           </div>
           </Col>
           </Row>
        </div>
        
    )
}