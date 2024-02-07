import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeState} from "../../slices/customWordsSlice";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [customText, setCustomText] = useState('')
  const dispatch = useDispatch();
  const words = useSelector((state:any) => state.words.value);
  let navigate = useNavigate();
  const stringToMassive = () => {
    const myArray = customText.split(" ");

    navigate("/");

    dispatch(changeState(myArray))
  }



  return (
    <div>
      <h1>Custom</h1>
      <textarea onChange={(e: any)=> setCustomText(e.target.value)} name="" id="" cols={30} rows={10}></textarea>
      <br/>
      <p>{words.map((word:string)=> (
        <span>{word} </span>
      ))}</p>
      <button onClick={()=> stringToMassive()}>ok</button>
    </div>
  );
};

export default Index;