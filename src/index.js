document.addEventListener('DOMContentLoaded', () => {
    const baseURL = `http://localhost:3000/beers`
    const beerList = document.getElementById('list-group')
    const beerDetail = document.getElementById('beer-detail')
    let beerId;
    fetchBeer()

    function fetchBeer(){
        fetch(baseURL)
        .then(r => r.json())
        .then(renderBeer)
    }

    function renderBeer(beers){
        beers.forEach(addToBeerList)
    }

    function addToBeerList(beer){
        const beerItem = document.createElement("li")
        beerItem.innerText = beer.name
        beerItem.id = `${beer.id}`
        beerItem.addEventListener("click", showBeerInfo)
        beerList.append(beerItem)
    }

    function editBeer(){
        let beerDesc = document.getElementById('beer-desc').value
        fetch(baseURL + `/${beerId}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
        },
            body: JSON.stringify({description: beerDesc})
         })
         .then(r => r.json())
    }

    function showBeerInfo(event){
        beerId = event.target.id
        fetch(baseURL + `/${beerId}`)
        .then(r => r.json())
        .then(beer => {
            beerDetail.innerHTML = 
            `<h1> ${beer.name} </h1>
            <img src="${beer.image_url}">
            <h3> ${beer.tagline} </h3>
            <textarea id='beer-desc' >${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
            Save
            </button>`

            let saveBtn = document.getElementById('edit-beer')
            saveBtn.addEventListener("click", editBeer)
             

})
    }
})