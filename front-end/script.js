const urlApi = 'http://localhost:3000/filmes';
const lista = document.getElementById('lista');
let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
    const response = await fetch(urlApi);
    const data = await response.json();
    console.log(data); 

    data.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
            <div class="column">
                <div class="card">
                    <img src="${filme.poster_url}" alt="Poster" style="width: 100%">
                    <div class="container-infos">
                        <h4>${filme.titulo}</h4>
                        <div class="genero">
                            <p>${filme.genero}</p>
                        </div>
                    </div>
                    <div class="container-rating">
                        <p>${filme.nota}</p>
                    </div>
                    <button type="button" class="btn" onclick="putFilme(${filme.id})">Editar</button>
                    <button type="button" class="btn btn-delete" onclick="deleteFilme(${filme.id})" >Excluir</button>
                </div>
            </div>
        `)
    })  
}
getFilmes();


const submitForm = async (evento) => {
    evento.preventDefault();

    let titulo = document.getElementById('titulo');
    let genero = document.getElementById('genero');
    let nota = document.getElementById('nota');
    let poster_url = document.getElementById('poster_url');

    const filme = {
        titulo: titulo.value,
        genero: genero.value,
        nota: nota.value,
        poster_url: poster_url.value
    }

    if(!edicao) {
        const request = new Request(`${urlApi}/add`, {
            method: 'POST',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        const response = await fetch(request);
        const result = await response.json();
        if(result) {
            getFilmes();
        }
    } else {
        const request = new Request(`${urlApi}/${idEdicao}`, {
            method: 'PUT',
            body: JSON.stringify(filme),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })

    const response = await fetch(request);
    const result = await response.json();
    
    if(result){
        edicao = false;
        getFilmes();
    }

    }

    titulo.value = '';
    genero.value = '';
    nota.value = '';
    poster_url.value = '';

    lista.innerHTML = '';
}

const getFilmeById = async (id) => {
    const response = await fetch(`${urlApi}/${id}`);
    return filme = response.json();
}

const putFilme = async (id) => {
    edicao = true;
    idEdicao = id;

    const filme = await getFilmeById(id);

    let titulo = document.getElementById('titulo');
    let genero = document.getElementById('genero');
    let nota = document.getElementById('nota');
    let poster_url = document.getElementById;('poster_url');

    titulo.value = filme.titulo;
    genero.value = filme.genero;
    nota.value = filme.nota;
    poster_url = filme.poster_url;

}

const deleteFilme = async (id) => {
    const request = new Request(`${urlApi}/${id}`, {
        method: 'DELETE',
    })
    const response = await fetch(request);
    const data= await response.json();
    
    lista.innerHTML  = '';
    getFilmes();
}
