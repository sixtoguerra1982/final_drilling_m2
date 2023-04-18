document.addEventListener('DOMContentLoaded', (e) => {
    
    const URL_BASE = "https://digimon-api.vercel.app/api/digimon"
    
    const NIVEL_BASE = []
    // btn a la escucha INICIO
    document.getElementById("btn-load").onclick = function() {
        removeBtnLoad()
        callApi(URL_BASE)
    }

    // btn a la escucha search
    document.getElementById("btn-search").onclick = function() {
        search()
    }

    // enter en input buscar
    var input = document.getElementById("txt-search")
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btn-search").click();
        }
    })

    // btn refresh
    document.getElementById("btn-refresh").onclick = function() {
        document.getElementById("txt-search").value = ""
        document.getElementById("nivelDataList").value = ""
        search()
    }

    // btn buscar nivel
    document.getElementById("btn-nivel").onclick = function() {
        let nivel_search = document.getElementById("nivelDataList").value
        let element = document.getElementById("list")
        element.innerHTML = ""
        if (nivel_search.length > 0){
            callApi(URL_BASE + "/level/" + nivel_search)
        }else{
            let frameLoad = document.getElementById("frame-load")
            frameLoad.classList.remove("d-none")
            callApi(URL_BASE)
        }
    }

    // enter en input buscar nivel
    input = document.getElementById("nivelDataList")
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("btn-nivel").click();
        }
    })

// funciones
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

    function callApi(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            drawCards(data);
        })
    }
        // llamado a la API
    
    function drawCards(data) {
        let element = document.getElementById("list")
        for (let temp of data){ 
            // ARRAY DE NIVELES DE DIGIMON
            NIVEL_BASE.push(temp.level)
            element.innerHTML += `
            <article class="col-md-4">
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
        // load
        element = document.getElementById("frame-load")
        element.classList.add("d-none")
        // 
        // ELIMINAR NIVELES REPETIDOS Y CARGAR EN LISTADO
        let tabla = {}
        let nivelBasicoUnico = NIVEL_BASE.filter((indice) => {
            return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true)
        })
        console.log(nivelBasicoUnico)
        let listNivel = document.getElementById("levels")
        listNivel.innerHTML = ""
        for (item of nivelBasicoUnico){
            listNivel.innerHTML += `
                <option value="${item}"> 
            `
        }

    }
        // Dibujo dinamico de cards digimon
    // 


    function search(){
        var search = document.getElementById("txt-search").value
        if (search.length == 0) {
            let frameLoad = document.getElementById("frame-load")
            frameLoad.classList.remove("d-none")
            let element = document.getElementById("list")
            element.innerHTML = ""
            callApi(URL_BASE)
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