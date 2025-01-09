export default function OrderCard({ orderInfo }) {
    return (
      <div className="order-card border-solid border-red-500 border-2 w-96 ">
        <h2>Информация о покупателе</h2>
        {/* <pre>{JSON.stringify(orderInfo.customerInfo, null, 2)}</pre> */}
        <pre>{JSON.stringify(orderInfo.customerInfo.payerType, null, 2)}</pre>
 <pre>{JSON.stringify(orderInfo.customerInfo.email, null, 2)}</pre>
<pre>{JSON.stringify(orderInfo.customerInfo.phone, null, 2)}</pre>
        <h2>Доставка</h2>
        <pre>{JSON.stringify(orderInfo.delivery.deliveryMethod, null, 2)}</pre>
     <pre>{JSON.stringify(orderInfo.delivery.deliveryCity, null, 2)}</pre>
         <pre>{JSON.stringify(orderInfo.delivery.terminalAddress, null, 2)}</pre>
        {/* <pre>{JSON.stringify(orderInfo.delivery, null, 2)}</pre> */}
        <h2>Оплата</h2>
        <pre>{JSON.stringify(orderInfo.payment.paymentMethod, null, 2)}</pre>
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
    );
  }
  