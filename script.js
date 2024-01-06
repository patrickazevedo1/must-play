const addButton = document.querySelector('.bx-plus')
const inputText = document.getElementById('inputText')
const ulContainer = document.querySelector('.list-container')

const addGame = () => {
    if(inputText.value.trim() === '') {
        return
    } 
    createLi()
    inputText.focus()   
}

inputText.addEventListener('keypress', (ev) => {
    if(ev.key == 'Enter' && inputText.value.trim() !== '') {
        createLi()
        inputText.focus()
        return
    }
})

const createLi = () => {
    const listItem = document.createElement('li')

    const inputCheckbox = document.createElement('input')
    inputCheckbox.type = 'checkbox'
    inputCheckbox.classList = 'checkBoxInput'
    inputCheckbox.value = inputText.value
    
    listItem.appendChild(inputCheckbox)

    const span = document.createElement('span');
    span.classList = 'liSpan'
    span.appendChild(document.createTextNode(inputText.value));

    listItem.appendChild(span)

    ulContainer.appendChild(listItem)
    inputText.value = ''

    inputCheckbox.addEventListener('change', saveOnLocalStorage)
    saveOnLocalStorage()
}

const saveOnLocalStorage = () => {
    const arr = []
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]')
    checkBoxes.forEach((checkBox) => {
        arr.push({game: checkBox.value, checked: checkBox.checked})
    })

    localStorage.setItem('list', JSON.stringify(arr))
}

const showOnScreen = () => {
    const arr = localStorage.getItem('list')

    if(arr) {
        const arrParse = JSON.parse(arr)

        arrParse.forEach((item) => {
            const listItem = document.createElement('li')
            const inputCheckbox = document.createElement('input')
            inputCheckbox.type = 'checkbox'
            inputCheckbox.classList = 'checkBoxInput'
            inputCheckbox.value = item.game
            inputCheckbox.checked = item.checked

            inputCheckbox.addEventListener('change', saveOnLocalStorage)

            const span = document.createElement('span');
            span.classList = 'liSpan'
            span.appendChild(document.createTextNode(item.game));

            listItem.appendChild(inputCheckbox)
            listItem.appendChild(span)
            ulContainer.appendChild(listItem)   
        })
    }
}

window.onload = showOnScreen