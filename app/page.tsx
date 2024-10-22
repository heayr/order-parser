export default function Home() {
  return (
    <>
    <h1>Вставьте текст заказа</h1>
    <textarea class="border-style: solid border-2 border-indigo-600" id="orderText" rows="20" cols="80"></textarea>
    <br />
    <button class="border-style: solid border-2 border-indigo-700" id="processButton">Обработать заказ</button>
    <pre id="output"></pre>
    </>
    
  )
}
