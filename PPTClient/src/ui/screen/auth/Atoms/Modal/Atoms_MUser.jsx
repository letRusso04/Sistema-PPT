import styled from "styled-components";
export const Atoms_MUserStyles = styled.div`
  margin: 15px;
  border: 3px solid rgba(100, 100, 100, 0.6);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  width: 80%;
  input {
    background: none;
    border: none;
    font-size: 15px;
    color: #aaa;
    font-weight: bold;
    width: 100%;
    margin-left: 5px;
    input::placeholder {
      font-size: 15px;
      color: #aaa;
      font-weight: bold;
    }
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .MUser_selecction{
    display: flex;
    color: #ccc;
    font-size: 16px;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    padding: 5px;

    input{
        cursor: pointer;
        margin-right: 5px;
        padding: 30px;
        background: none;
        border: 1px solid rgba(100,100,100,0.9);

    }

  }
`;
export default Atoms_MUserStyles;
