import styled from "styled-components"
import img from '../../assets/background.png'
export const RegisterBox = styled.div`
display:flex;
align-items: center;
justify-content: center;

form{
display: grid;
align-items: center;
justify-content: center;
padding: 3rem;
margin-top: 10rem;
border: 1px solid #5774b6;
border-radius: 10px;    
background-color: #ffffff;
}

h1 {
    text-align: center;
}

span {
    margin-top: 1rem;
    text-align: center;
}

input {
    margin-bottom: 2rem;
    width: 20rem;
    border: 1px solid #E1E1E1;
    background-color: #F1F1F2;
    padding: 0.7rem;
    border-radius: 0.3rem;
}

button {
    display: flex;
    height: 2.5rem;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    color: #5774b6;
    padding: 0.75rem;
    border: 1px solid #5774b6;
    border-radius: 0.3rem;
    font-size: 0.85rem;
    cursor: pointer;

    :hover {
        background-color: #5774b6;
        color: #ffffff;
    }
}

    
`

export const BackgroundImage = styled.div`
    background-image: url(${img});
    height: 100vh;
    z-index: -1;
`