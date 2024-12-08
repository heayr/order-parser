"use client"
import { useState } from 'react';

export default function OrderParser() {
  const [orderText, setOrderText] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);

  const parseOrderDetails = (text) => {
    const lines = text.split('\n');
    const orderInfo = {
      customerInfo: {},
      delivery: {},
      payment: {},
      orderItems: [],
      totalPrice: ''
    };

    let currentSection = '';

    lines.forEach(line => {
      line = line.trim();

      if (line.startsWith('Информация о покупателе')) {
        currentSection = 'customerInfo';
      } else if (line.startsWith('Доставка:')) {
        currentSection = 'delivery';
      } else if (line.startsWith('Оплата:')) {
        currentSection = 'payment';
      } else if (line.startsWith('Состав заказа:')) {
        currentSection = 'orderItems';
      }

      if (currentSection === 'customerInfo') {
        if (line.includes('Тип плательщика:')) orderInfo.customerInfo.payerType = line.split(': ')[1];
        if (line.includes('Название организации:')) orderInfo.customerInfo.organization = line.split(': ')[1];
        if (line.includes('ИНН:')) orderInfo.customerInfo.inn = line.split(': ')[1];
        if (line.includes('КПП:')) orderInfo.customerInfo.kpp = line.split(': ')[1];
        if (line.includes('Юридический адрес:')) orderInfo.customerInfo.legalAddress = line.split(': ')[1];
        if (line.includes('Фактический адрес:')) orderInfo.customerInfo.actualAddress = line.split(': ')[1];
        if (line.includes('ФИО заказчика:')) orderInfo.customerInfo.customerName = line.split(': ')[1];
        if (line.includes('E-Mail:')) orderInfo.customerInfo.email = line.split(': ')[1];
        if (line.includes('Телефон:')) orderInfo.customerInfo.phone = line.split(': ')[1];
        if (line.includes('Комментарии к заказу:')) orderInfo.customerInfo.comment = line.split(': ')[1];
      }

      if (currentSection === 'delivery') {
        if (line.includes('Доставка')) orderInfo.delivery.deliveryMethod = line.split(' - ')[1];
        if (line.includes('Самовывоз')) orderInfo.delivery.deliveryMethod = line.substring();
        if (line.includes('Адрес терминала:')) orderInfo.delivery.terminalAddress = line.split(': ')[1];
            if (line.includes('Москва'))  orderInfo.delivery.deliveryCity = line.substring();
            if (line.includes('Офис')) orderInfo.delivery.terminalAddress = line.substring();
        }
    

      if (currentSection === 'payment') {
        if (line.includes('Способ оплаты:')) orderInfo.payment.paymentMethod = line.split(': ')[1];
      }

      if (currentSection === 'orderItems') {
        const itemMatch = line.match(/Артикул:\s*([^,]+),\s*Наименование:\s*([^,]+),\s*Цена:\s*([^,]+),\s*Кол-во:\s*([^,]+),\s*Cумма:\s*([^,]+)/);
        if (itemMatch) {
          const item = {
            article: itemMatch[1].trim(),
            name: itemMatch[2].trim(),
            price: itemMatch[3].trim(),
            quantity: itemMatch[4].trim(),
            total: itemMatch[5].trim()
          };
          orderInfo.orderItems.push(item);
        }
        if (line.includes('Общая стоимость товаров:')) {
          orderInfo.totalPrice = line.split(': ')[1];
        }
      }
    });

    return orderInfo;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedOrder = parseOrderDetails(orderText);
    setOrderInfo(parsedOrder);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Обработка заказа</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={orderText}
          onChange={(e) => setOrderText(e.target.value)}
          rows="10"
          cols="80"
          placeholder="Вставьте сюда текст заказа"
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Обработать заказ
        </button>
      </form>

      {orderInfo && (
        <div className='border-style: solid border-2 border-indigo-600 rounded-xl mt-5 w-60 flex flex-col'  >
          <h2 className='m-2 max-w-52'>Информация о покупателе</h2>
          <pre>{JSON.stringify(orderInfo.customerInfo.payerType, null, 2)}</pre>
          <pre>{JSON.stringify(orderInfo.customerInfo.email, null, 2)}</pre>
          <pre>{JSON.stringify(orderInfo.customerInfo.phone, null, 2)}</pre>

          <h2>Доставка</h2>
          <pre>{JSON.stringify(orderInfo.delivery.deliveryMethod, null, 2)}</pre>
          <pre>{JSON.stringify(orderInfo.delivery.deliveryCity, null, 2)}</pre>
          <pre>{JSON.stringify(orderInfo.delivery.terminalAddress, null, 2)}</pre>
          {/* <pre>{JSON.stringify(orderInfo.delivery, null, 2)}</pre> */}
          {/* <pre>{JSON.stringify(orderInfo.delivery, null, 2)}</pre> */}

          <h2>Оплата</h2>
          <pre>{JSON.stringify(orderInfo.payment, null, 2)}</pre>

          <h2>Состав заказа</h2>
          {orderInfo.orderItems.length > 0 ? (
            orderInfo.orderItems.map((item, index) => (
              <pre key={index}>{JSON.stringify(item, null, 2)}</pre>
            ))
          ) : (
            <p>Нет товаров</p>
          )}

          <h2>Общая стоимость товаров</h2>
          <p>{orderInfo.totalPrice}</p>
        </div>
      )}
    </div>
  );
}
