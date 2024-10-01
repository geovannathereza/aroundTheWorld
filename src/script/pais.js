document.addEventListener('DOMContentLoaded', () => {
    const nomepais = new URLSearchParams(location.search).get('name');
    const bandeiraimg = document.querySelector('#containerPaises img')
    const nomepaish2 = document.querySelector('#titulo')
    const nomepaish3 = document.querySelector('#titulo2')

    const capital = document.querySelector('#capital')
    const regiao = document.querySelector('#regiao')
    const subregiao = document.querySelector('#sub-regiao')
    const populacao = document.querySelector('#populacao')
    const area = document.querySelector('#area')
    
    const idiomas = document.querySelector('#idiomas')
    const moedas = document.querySelector('#moedas')
    const fusohorario = document.querySelector('#fusoHorario')
    const tld = document.querySelector('#tld')
    const discagem = document.querySelector('#discagem')

    fetch(`https://restcountries.com/v3.1/name/${nomepais}?fullText=True`)
    .then((res) => res.json())
    .then(([country]) => {
        console.log(country)
        bandeiraimg.src = country.flags.svg
        nomepaish2.innerText = country.name.official
        nomepaish3.innerText = country.translations.por.official

        capital.innerText = country.capital?.[0]
        regiao.innerText = country.region
        subregiao.innerText = country.subregion
        populacao.innerText = country.population.toLocaleString('pt-BR')
        area.innerText = country.area.toLocaleString('pt-BR')

        idiomas.innerText = Object.values(country.languages).join(', ')
        moedas.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
        fusoHorario.innerText = country.timezones.join(', ')
        tld.innerText = country.tld.join(', ')
        discagem.innerText = country.idd.root + country.idd.suffixes?.[0]
        
    });
});
