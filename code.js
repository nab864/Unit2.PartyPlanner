// Make the event planner into a Table
const apiURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-MT-WEB-PT/events'
let state = {
  entries: []
}

const formElement = document.querySelector('form')
const tableElement = document.querySelector('table')


const getEvents = async () => {
  const response = await fetch(apiURL)
  const result = await response.json()
  const finalResults = await result.data
  state.entries= finalResults
  return finalResults
}

const render = async () => {
  // Rerenders the Table Headers
  const headertext = ['Name', 'Description', 'Date', 'Location', 'Delete']
  const thElement = document.querySelector('tr')
  const eventElements = []
  if (!eventElements) {
  headertext.forEach((item) => {
    const currentHeader = document.createElement('th')
    currentHeader.textContent = item
    thElement.append(currentHeader)
  })}
  eventElements.push(thElement)


  for (let i = 0; i<state.entries.length; i++) {
    const trElement = document.createElement('tr')

    const nameElement = document.createElement('td')
    nameElement.textContent = state.entries[i].name
    
    const descripElement = document.createElement('td')
    descripElement.textContent = state.entries[i].description

    const dateElement = document.createElement('td')
    dateElement.textContent = state.entries[i].date

    const locationElement = document.createElement('td')
    locationElement.textContent = state.entries[i].location

    const buttonTable = document.createElement('td')
    const buttonElement = document.createElement('button')
    buttonElement.addEventListener('click', () => {
      deleteEntry(state.entries[i].id)
    })
    buttonElement.textContent = 'Delete'
    buttonTable.append(buttonElement)
    


    trElement.append(nameElement, descripElement, dateElement,locationElement, buttonTable)
    eventElements.push(trElement)
    
  }
  
  tableElement.replaceChildren(...eventElements)
}

function renderForm() {
  const formItems = []
  const formFields = ['Name', 'Description', 'Date', 'Location']
  const formLabel = document.createElement('h2')
  formLabel.textContent = 'Add an Event'
  formItems.push(formLabel)

  for (let i = 0; i < formFields.length; i++) {
    const fieldContainer = document.createElement('div')
    const curLabel = document.createElement('label')
    const curInput = document.createElement('input')
    curLabel.textContent = `${formFields[i]}`
    curInput.setAttribute('name', `${formFields[i]}`)
    curInput.setAttribute('id', `${formFields[i]}`)
    fieldContainer.append(curLabel, curInput)
    formItems.push(fieldContainer)
  }

  const submitButton = document.createElement('button')
  submitButton.textContent = 'Submit'

  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('Name')
    const descriptionInput = document.getElementById('Description')
    const dateInput = document.getElementById('Date')
    const locationInput = document.getElementById('Location')


    const formData = {
      name: nameInput.value,
      description: descriptionInput.value,
      date: dateInput.value,
      location: locationInput.value
    }
    console.log(formData)
    addEntry(formData)

  })

  formItems.push(submitButton)
  formElement.append(...formItems)
}




const deleteEntry = async (eventID) => {
  const response = await fetch(`${apiURL}/${eventID}`, {
    method: 'DELETE',
    headers: { 
      'Content-type': 'application/json'
  } 
  })
  index = state.entries.findIndex((entry) => entry.id === eventID)
  state.entries.splice(index, 1)
  render()
}

const addEntry = async(newEvent) => {
  const response = await fetch(apiURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newEvent)
  })
  await getEvents()
  render()
}

async function init() {
  await getEvents()
  renderForm()
  render()
}
init()
