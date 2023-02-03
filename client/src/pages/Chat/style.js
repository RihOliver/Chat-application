import styled from "styled-components"
import img from '../../assets/chatBackground.png'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 5rem 35rem 0rem 35rem;
    

    form {
        background: #5774b6;
        padding: 1rem;
        border-radius: 10px;
        width: 100%;
        margin-top: 5rem;
        
      }
      
      .form__field {
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        color: #333;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        width: 95.5%;
      }
      
      .form__field:focus {
        border-color: #a3f7ff;
        box-shadow: 0 0 7px #a3f7ff;
        outline: none;
      }
    h1 {
      text-align: center;
    }  
    ul {
        margin: 0;
        padding: 1rem;
        border: 1px solid #5774b6;
        height: 33.5rem;
        width: 100%;
        border-radius: 10px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: #F1F1F2;

      ::-webkit-scrollbar {
          height: 0.5rem;
          background-color: #E1E1E1;    
      }

      ::-webkit-scrollbar-thumb {
          background: #333333;
          border-radius: 0.3rem;        
      }

        .list {
            margin: 0;
            padding: 1rem;
          }
          
          .list__item {
            list-style: none;
            text-align: right;
          }
          
          .list__item.list__item--mine {
            text-align: left;
          }
          
          
          .message {
            border: 1px solid transparent;
            border-radius: 5px;
            display: inline-block;
            list-style: none;
            margin-bottom: 1rem;
            padding: .5rem 1rem;
          }
          
          .message.message--mine {
            background: #c3e88d;
            border-color: #82be27;
            text-align: left;
          }
          
          .message.message--other {
            background: #89ddff;
            border-color: #1abeff;
          }
          
    }
`
export const BackgroundImage = styled.div`
    background-image: url(${img});
    height: 100vh;
    z-index: -1;
`