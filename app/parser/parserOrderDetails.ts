export default function parseOrderDetails(text) {
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

    // Определение текущей секции
    if (line.startsWith('Информация о покупателе')) {
      currentSection = 'customerInfo';
    } else if (line.startsWith('Доставка:')) {
      currentSection = 'delivery';
    } else if (line.startsWith('Оплата:')) {
      currentSection = 'payment';
    } else if (line.startsWith('Состав заказа:')) {
      currentSection = 'orderItems';
    }

    // Парсинг данных в зависимости от текущей секции
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
        if (line.includes('Комментарии к заказу:')) orderInfo.customerInfo.comment = line.split(': ')[1]; }

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
}