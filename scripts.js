const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
    e.preventDefault(); /* It will null default action of submit */
   
    // let`s put our data in an object
    text = (this.querySelector("[name=item]")).value;
    const item = {
        text, 
        done: false
    }
    items.push(item);

    // let`s refresh out list with updates
    populateList(items, itemsList);

    // lte`s persist data at the local storage
    localStorage.setItem('items', JSON.stringify(items));

    this.reset(); /* resetting form */
    this.querySelector("[name=item]").focus(); /* focusing main input */
}

function populateList(plates = [], plateList){
    plateList.innerHTML = plates.map((plate, index) => {
        return `
            <li>
                <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''} />
                <label for="item${index}">${plate.text  }</label>
            </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return; // skip this unless it`s an input
    const el = e.target;
    const index = el.dataset.index;
    console.log(index);

    // let`s update checkbox input
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone)

// populating list when page is loaded
populateList(items, itemsList);