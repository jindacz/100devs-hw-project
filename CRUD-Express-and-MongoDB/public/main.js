const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    // Send PUT Request here
    fetch('/quotes', {
        // We need to send a PUT request this time. We can do this by setting Fetch’s method to put.
        method: 'put',
        // We need to tell the server we’re sending JSON data by setting the Content-Type headers to application/json.
        headers: { 'Content-Type': 'application/json' },
        // we need to convert the data we send into JSON. We can do this with JSON.stringify. This data is passed via the body property.
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith disturbing.'
        })
    })
})

// Then, we’ll trigger a DELETE request through Fetch when a user clicks the delete button.
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Darth Vadar'
        })
    })
        .then(response => {
        if (response === 'No quote to delete') {
          messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
          window.location.reload(true)
        }
      })
})