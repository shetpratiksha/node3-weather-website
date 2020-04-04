console.log('Js serving the page')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const inputSearch = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = inputSearch.value;
 //   console.log(location);
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
           console.log(data.error);
           messageOne.textContent = data.error;
           messageTwo.textContent = '';
        }
        else{
            console.log('Forecast: '+data.forecast+' Location: '+data.location);
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
});
