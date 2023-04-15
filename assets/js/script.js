window.onload = (event) => {
    
    const URL_BASE = "https://digimon-api.vercel.app/api/digimon"


    // btn a la escucha
    document.getElementById("btn-load").onclick = function() {
        removeBtnLoad()
        callApi()
    }

    function removeBtnLoad(){
        let element = document.getElementById("list")
        element.innerHTML = ""
        element.classList.remove("d-none")
        element = document.getElementById("btn-initial")
        element.classList.add("d-none")
    }

    function callApi() {
        fetch(URL_BASE)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            drawCards(data);
        });
    }
    
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
                        <li class="list-group-item"><a href="http://">Más Información</a></li>
                    </ul>    
                </div>
            </article>
            `
        }
    }
    // 
};