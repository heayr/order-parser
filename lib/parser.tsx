import { useState, FormEvent, ChangeEvent } from "react";

function parseOrderDetails(text) {
    // Разбиваем текст на строки
    const lines = text.split('\n');

    // Объект для хранения данных
    const orderInfo = {
        customerInfo: {},
        delivery: {},
        payment: {},
        orderItems: [],
        totalPrice: ''
    };

    // Временные переменные для хранения текущей секции
    let currentSection = '';

    lines.forEach(line => {
        line = line.trim();
        // Определяем, в какой секции находимся
        if (line.startsWith('Информация о покупателе')) {
            currentSection = 'customerInfo';
        } else if (line.startsWith('Доставка:')) {
            currentSection = 'delivery';
        } else if (line.startsWith('Оплата:')) {
            currentSection = 'payment';
        } else if (line.startsWith('Состав заказа:')) {
            currentSection = 'orderItems';
        }

        // Заполняем данные в зависимости от текущей секции
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
            if (line.includes('Адрес терминала:')) orderInfo.delivery.terminalAddress = line.split(': ')[1];
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

// Пример входного текста (из вашего примера)
// const emailText = `
// Информация о покупателе:
// Тип плательщика: Юридическое лицо
// Название организации: ООО ДЕЛЬТА
// ИНН: 3241503278
// КПП: 324101001
// Юридический адрес: 243022, Брянская обл,, г. Новозыбков, ул. Ломоносова д.9
// Фактический адрес: 243022, Брянская обл., г. Новозыбков, ул. Ломоносова д. 9
// ФИО заказчика: Степаненко Евгений Васильевич
// E-Mail: delta32@bk.ru
// Телефон: 79605633504
// Комментарии к заказу:: Добрый день, прошу выставить счет. ООО ДЕЛЬТА является действительным членом АСМАП.
// Доставка:
// Доставка ТК - СДЭК
// Адрес терминала: 243020, Брянская обл., г. Новозыбков, ул. Комсомольская д. 12, пункт выдачи СДЭК.
// Оплата:
// Способ оплаты: Выставить счёт
// Состав заказа:
// Артикул: 95500Т, Наименование: Каска. Стандарт ЕС, Цена: 270 руб., Кол-во: 1 шт., Cумма: 270 руб.
// Артикул: ADR_FULL, Наименование: Комплект ADR. УНИВЕРСАЛЬНЫЙ, Цена: 7 850 руб., Кол-во: 1 шт., Cумма: 7 850 руб.
// Артикул: 912792, Наименование: Кронштейн (карман) для табличек оранжевых (300*400 мм), Цена: 600 руб., Кол-во: 4 шт., Cумма: 2 400 руб.
// Артикул: Т2761, Наименование: Табличка ADR (120x300мм). Сгибаемая по вертикали. Россия., Цена: 980 руб., Кол-во: 1 шт., Cумма: 980 руб.
// Артикул: 91201, Наименование: Табличка ADR (400х300мм). Не сгибаемая., Цена: 580 руб., Кол-во: 4 шт., Cумма: 2 320 руб.
// Артикул: АТ27795, Наименование: Табличка ТIR (400х250мм). Светоотражающая, Цена: 500 руб., Кол-во: 3 шт., Cумма: 1 500 руб.
// Артикул: Ц_R22_8, Наименование: Цепи браслеты противоскольжения для грузовиков на R22.5 (8 шт. в комплекте), Цена: 8 900 руб., Кол-во: 1 шт., Cумма: 8 900 руб.
// Общая стоимость товаров: 24 220 руб.




// `


const result = parseOrderDetails(emailText);
console.log(result);


// function parseOrderDetails(text) {
//     // Ваша функция для обработки текста
//     // Вставьте сюда ранее описанный код для парсинга
//     // ...
// }

// document
//     .getElementById("processButton")
//     .addEventListener("click", function () {
//         const orderText = document.getElementById("orderText").value;
//         const result = parseOrderDetails(orderText);
//         document.getElementById("output").innerText = JSON.stringify(
//             result,
//             null,
//             2
//         );
//     });