const baseURL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll('.dropDown select');
let  btn = document.querySelector('.convert');
const  fromCurr = document.querySelector('.from select');
const  toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

for (let s of dropdown) {
    for (let i in countryList) {
        let option = document.createElement('option');
        option.value = countryList[i];
        option.text = i;
        if (s.name ==="from" && i === "USD") {
            option.selected = true;
        }
        if (s.name ==="to" && i === "INR") {
            option.selected = true;
        }
        s.appendChild(option);
    }

    s.addEventListener('change', (evt) => {
    updateFlag(evt.target ); }  )

}

const updateFlag = (element)=>
{
    let currCode = element.value;
    let newSrc = `https://flagsapi.com/${currCode}/flat/64.png`;
    console.log(element);
    let img = element.parentElement.querySelector('img') ;
    img.src = newSrc;
}

btn.addEventListener('click',async (event) => {
    event.preventDefault();
   let amount = document.querySelector('#amount');
   let amVal = amount.value;
   if (amVal ==="" || amVal <= 1)
    {
        amVal = 1
        amount.value = "1";
    }
    // console.log(fromCurr.value);
    // console.log(toCurr.value);

    const URL ='${baseURL}/${fromCurr.toLowerCase()}/${toCurr.value.toLowerCase()}.json';
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = rate * amVal; 
    msg.innerText = `${amVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    console.log(response);
});
