"use client";
import { FormEvent, useState } from "react"

export default function Form(){

    const [text, setMessage] = useState('');

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(message);
        
    }

    return (
        <>
        <h1>Вставьте текст заказа</h1>
        <form onSubmit={onSubmit} >
        {/* <input type="text" id="orderText" name="orderText" required></input> */}
        <textarea 
        onChange={(e) => setMessage(e.target.value)}
        className="border-style: solid border-2 border-indigo-600" id="orderText" rows="20" cols="80"
        value={text}
        ></textarea>
        <br />
        <button type="submit" class="border-style: solid border-2 border-indigo-700" id="processButton">Обработать заказ</button>
        <pre id="output"></pre>
        </form>
        </>
        )
};






