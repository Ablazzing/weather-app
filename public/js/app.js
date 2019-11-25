document.addEventListener('DOMContentLoaded',()=>{
    
    const weatherForm = document.getElementById('location')
    const location_input = document.getElementById('location_input')
    const message1 = document.getElementById('message1')
    const message2 = document.getElementById('message2')
    console.log(weatherForm)


    weatherForm.addEventListener('submit',(event)=>{
    
        console.log(location_input)
        event.preventDefault()
        if (location_input.value!==''){
            message1.textContent = 'loading...'
            message2.textContent = 'loading...'
            fetch( 'http://localhost:3000/weather?address=' +location_input.value).then(data=>{
            console.log(data)    
            return data.json()}).then(data=>{
                message1.textContent=data.location
                message2.textContent = data.forecast.summary
            }).catch(error=>{
                message1.textContent='Address not found!'
                message2.textContent = ''
            }) } 
    

    }) 

    

})
    
