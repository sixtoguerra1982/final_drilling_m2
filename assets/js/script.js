document.addEventListener('DOMContentLoaded', (e) => {
    
    const URL_BASE = "https://digimon-api.vercel.app/api/digimon"

    // btn a la escucha INICIO
    document.getElementById("btn-load").onclick = function() {
        removeBtnLoad()
        callApi()
    }

    // btn a la escucha search
    document.getElementById("btn-search").onclick = function() {
        search()
    }

    // btn refresh
    document.getElementById("btn-refresh").onclick = function() {
        document.getElementById("txt-search").value = ""
        search()
    }

    // funciones que realizan las tareas
    function removeBtnLoad(){
        let element = document.getElementById("list")
        element.innerHTML = ""
        element.classList.remove("d-none")
        element = document.getElementById("btn-initial")
        element.classList.add("d-none")
        element = document.getElementById("nav-bar")
        element.classList.remove("d-none")
        element = document.getElementById("frame-load")
        element.classList.remove("d-none")
    } 
        // Actualiza elementos en vista

    function callApi() {
        fetch(URL_BASE)
        .then(response => response.json())
        .then(data => {
            drawCards(data);
        })
    }
        // llamado a la API
    
    function drawCards(data) {
        let element = document.getElementById("list")

        for (let temp of data){ 
            element.innerHTML += `
            <article class="col-md-3">
                <div class="card">
                    <img src="${temp.img}" class="card-img-top" alt="${temp.img}">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><h5 class="card-title">${temp.name}</h5></li>
                            <li class="list-group-item">Nivel: ${temp.level}</li>
                        <ul>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <button onclick="myShowModal('${temp.name.toLowerCase()}')" type="button" class="btn btn-success btn-more">Más Información</button>
                        </li>
                    </ul>    
                </div>
            </article>
            `
        }

        element = document.getElementById("frame-load")
        element.classList.add("d-none")
    }
        // Dibujo dinamico de cards digimon
    // 


    function search(){
        var search = document.getElementById("txt-search").value
        if (search.length == 0) {
            let element = document.getElementById("list")
            element.innerHTML = ""
            callApi()
        } else {
            let name = search.toLowerCase()
            fetch(URL_BASE + "/name/" + name)
            .then(response => response.json())
            .then(data => {
                let element = document.getElementById("list")
                element.innerHTML = ""
                if (data.length > 0){
                    document.getElementById("txt-search").value = ""
                    for (let temp of data){ 
                        element.innerHTML += `
                        <article class="col">
                            <div class="card">
                                <img src="${temp.img}" class="card-img-top" alt="${temp.img}">
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item"><h5 class="card-title">${temp.name}</h5></li>
                                        <li class="list-group-item">Nivel: ${temp.level}</li>
                                    <ul>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <button onclick="myShowModal('${temp.name.toLowerCase()}')" type="button" class="btn btn-success btn-more">Más Información</button>
                                    </li>
                                </ul>    
                            </div>
                        </article>
                        `
                    }
                } else {
                    alert('Digimon No Encontrado')
                }
            })
        }
    }
    // busqueda de digimon
})