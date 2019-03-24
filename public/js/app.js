console.log('Client side javascript file is loaded!')

// fetch('http://localhost:3000/weather?address=London').then((response)=>{
// 	response.json().then((data)=>{
// 		if (data.error) {
// 			console.log(data.error)
// 		} else{
// 			console.log(data.location)
// 			console.log(data.forecast)
// 		}
// 	})
// })

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// 	response.json().then((data) => {
// 		console.log(data)
// 	})
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
	//stops from refreshing the whole page when the form is submitted
	e.preventDefault()
	
	messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
	const location = search.value
	console.log(location)
	// Chaning it to relative URL for Heroku, it should also work in local.
	// const url = 'http://localhost:3000/weather?address='+location
	const url = '/weather?address='+location

	fetch(url).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				messageOne.textContent = data.error
			} else {
				messageOne.textContent = data.location
				messageTwo.textContent = data.forecast
			}
		})
	})
})