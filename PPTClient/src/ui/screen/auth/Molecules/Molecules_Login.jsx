
import styled from "styled-components";
export const Molecules_LoginStyles = styled.div`
          width: 70%;
          padding: 20px;
          display: flex;
          .form_input {
            border: 2px solid rgba(100, 100, 100, 0.5);
            width: 100%;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: start;
            padding: 5px;
            p {
              font-size: 18px;
              margin: 0px;
            }
            input {
              background: none;
              border: none;
              width: 100%;
              padding: 2px;
              font-size: 19px;
              color: #ccc;
              overflow: hidden;
            }
          }
          .form_button {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
             input {
              width: 100%;
              height: 50px;
              padding: 5px;
              cursor: pointer;
              border-radius: 5px;
              border: 1px solid rgba(150, 150, 150, 0.5);
              background: rgba(18, 0, 100, 0.8);
              transition: background 300ms;
              color: #ccc;
              font-size: 20px;
              &:hover {
                background: #000264;
                color: #fff;
              }
            }
             div {
                margin-top: 10px;
         
              p {
                font-size: 14px;
                margin: 1px;
              }
              a {
                margin-left: 5px;
                font-size: 14px;
                color: rgba(0, 4, 250, 0.9);
                cursor: pointer;
                font-weight: 400;
                text-decoration: none;
              }
            }
          }
`;
export default Molecules_LoginStyles;
