
/*  Начальные 3 цифры в каждом номере- это код оператора
 Сделать вывод  в консоль таким
(063) 111 1234
(333) 456 8768
(444) 657 5547
*/
let st = `063-111-1234
(333) 456-8768
4446575547`;

// solution 1
const sanitizedStr = st.replace(/[^\d]/g, '');
const re = /(\d{3})(\d{3})(\d{4})/g

console.log(sanitizedStr.replace(re, '($1) $2 $3\n'));


// solution 2
const phonesArr = st.match(/^[(]?\d{3}([-)\s]?)*\d{3}-?\d{4}$/gm);

phonesArr.forEach(el => {
    console.log(el.replace(/[^\d]/g, '').replace(re, '($1) $2 $3'));
})