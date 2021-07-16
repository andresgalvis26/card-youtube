document.addEventListener("DOMContentLoaded", () => {
    const numRandom = getRandomInt(1, 151)
    fetchData(numRandom)
})

// Creando una función que retorne un número aleatorio entre 1 y 150
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Visualizando que funciona en consola
/*console.log()*/

// Consumiendo el API
const fetchData = async (id) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        /*console.log(data)*/
        console.log(data)

        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat
        };


        pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
} 

const pintarCard = (pokemon) => {
    console.log(pokemon)
    /* Creando la relación con el main (flex)*/
    const flex = document.querySelector(".flex")

    /* Creando la relación con el template */
    const template = document.getElementById("template-card").content

    /* Creando el clone */
    const clone = template.cloneNode(true)

    /* Creando el fragment */
    const fragment = document.createDocumentFragment()

    clone.querySelector(".card-body-img").setAttribute("src", pokemon.img)
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`
    clone.querySelector(".card-body-text").textContent = pokemon.experiencia + ' Exp '
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = pokemon.ataque + 'K',
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = pokemon.defensa + 'K',
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = pokemon.especial + 'K',

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}