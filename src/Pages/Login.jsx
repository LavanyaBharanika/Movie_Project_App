import React, { useState } from "react";
import img from '../assets/00001.png';
import './css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Button } from 'antd';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const currentUser = auth.currentUser;
            if (currentUser) {
                console.log(currentUser.email);
                localStorage.removeItem("isGuest"); // Clear guest flag if present
                navigate('/'); // Redirect to home page
            }
        } catch (error) {
            console.error(error);
            // Handle login error
        }
    };

    const handleGuestLogin = () => {
        localStorage.setItem("isGuest", "true"); // Set guest flag
        navigate('/'); // Redirect to home page as a guest
    };

    return (
        <div className="login" style={{ background: '#ffc6dd', width: '100vw' }}>
            <Row>
                <Col style={{ padding: '4rem', width: "25%", marginLeft: '6rem' }}>
                    <div>
                        <img src={img} width={480} height={580} alt="Logo" />
                    </div>
                </Col>
                <Col>
                    <div className="form" style={{ paddingTop: '14rem', marginRight: 30 }}>
                        <h1 style={{ color: 'black', marginLeft: '6rem' }}>Cinematic Flik</h1>
                        <Input style={{ width: '20rem', padding: 10, marginBottom: 15, marginLeft: '6rem' }} onChange={(e) =>
                            setEmail(e.currentTarget.value)} type="email" placeholder="Enter Email Address" />
                        <Input style={{ width: '20rem', padding: 10, marginBottom: 15, marginLeft: '6rem' }} onChange={(e) =>
                            setPassword(e.currentTarget.value)} type="password" placeholder="Enter Password" />
                        <div style={{display:'flex',marginLeft:'8rem',gap:'3rem'}}>
                        <Button style={{ display: "flex", justifyContent: "center", alignItems: "center",  padding: 15 }} onClick={handleChange} type="primary">Login Now</Button>
                        <Button style={{ display: "flex", justifyContent: "center", alignItems: "center",  padding: 15 }} onClick={handleGuestLogin} type="primary">Guest Mode</Button>
                        </div>
                        <div style={{ display: "flex", justifyContent: 'center', marginTop: 25 }}>New here? Please <span onClick={() => navigate('/signup')} style={{ color: 'blue', cursor: 'pointer' }}>Sign up</span></div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
