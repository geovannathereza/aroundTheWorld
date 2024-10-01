document.addEventListener('DOMContentLoaded', () => {
    const containerPaises = document.querySelector('.containerPaises');
    const dropdownFiltro = document.getElementById('dropdownFiltro');
    const botaoFiltro = document.getElementById('botaoFiltro');
    const dropdownOrdenar = document.getElementById('dropdownOrdenar');
    const botaoOrdenar = document.getElementById('botaoOrdenar');

    let paisesData = [];
    let filtroPaises = [];

    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            paisesData = data;
            displayCountries(paisesData);
        });

    function displayCountries(countries) {
        containerPaises.innerHTML = '';
        countries.forEach(country => {
            const paisHTML = `
                <div id="containerPaises">
                    <a href="pais.html?name=${country.name.common}" id="containerPais">
                        <img src="${country.flags.svg}" alt="Bandeira">
                        <div id="conteudoPais">
                            <h2 id="titulo">${country.translations.por.common}</h2>
                            <p><b>Capital: </b>${country.capital?.[0]}</p>
                            <p><b>Região: </b>${country.region}</p>
                        </div>
                    </a>
                </div>
            `;
            const contPais = document.createElement('div');
            contPais.innerHTML = paisHTML;
            containerPaises.append(contPais);
        });
    }

    document.getElementById('pesquisar').addEventListener('submit', (event) => {
        event.preventDefault();
        const searchValue = document.getElementById('nome_pais').value.toLowerCase();
        filtroPaises = paisesData.filter(country => 
            country.name.common.toLowerCase().includes(searchValue) || 
            country.translations.por.common.toLowerCase().includes(searchValue)
        );
        displayCountries(filtroPaises);
    });

    function filterCountries() {
        const checkedRegions = Array.from(document.querySelectorAll('#filtro_regioes input[type="checkbox"]:checked'))
            .map(input => input.value);
        const checkedPopulacao = Array.from(document.querySelectorAll('.populacao:checked'))
            .map(input => input.value);

            filtroPaises = paisesData.filter(country => {
            const regionMatch = checkedRegions.length === 0 || 
                checkedRegions.includes(country.region) || 
                (country.subregion && checkedRegions.includes(country.subregion));

            const populationMatch = checkedPopulacao.length === 0 || checkedPopulacao.some(filter => {
                if (filter === '<1M') return country.population < 1000000;
                if (filter === '1M-10M') return country.population >= 1000000 && country.population < 10000000;
                if (filter === '10M-100M') return country.population >= 10000000 && country.population < 100000000;
                if (filter === '>100M') return country.population > 100000000;
            });

            return regionMatch && populationMatch;
        });

        displayCountries(filtroPaises);
    }

    botaoFiltro.addEventListener('click', () => {
        dropdownFiltro.style.display = dropdownFiltro.style.display === 'none' ? 'block' : 'none';
    });

    document.querySelectorAll('#filtro_regioes input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', filterCountries);
    });

    document.querySelectorAll('.populacao').forEach(checkbox => {
        checkbox.addEventListener('change', filterCountries);
    });

    botaoOrdenar.addEventListener('click', () => {
        dropdownOrdenar.style.display = dropdownOrdenar.style.display === 'none' ? 'block' : 'none';
    });

    function sortCountries(criteria) {
        let countriesToSort = filtroPaises.length > 0 ? filtroPaises : paisesData;
        let sortedCountries;

        if (criteria === 'name') {
            sortedCountries = [...countriesToSort].sort((a, b) => a.translations.por.common.localeCompare(b.translations.por.common));
        } else if (criteria === 'population') {
            sortedCountries = [...countriesToSort].sort((a, b) => a.population - b.population);
        } else if (criteria === 'area') {
            sortedCountries = [...countriesToSort].sort((a, b) => a.area - b.area);
        }

        displayCountries(sortedCountries);
    }

    document.getElementById('ordenarNome').addEventListener('click', () => {
        sortCountries('name');
        dropdownOrdenar.style.display = 'none';
    });

    document.getElementById('ordenarPopulacao').addEventListener('click', () => {
        sortCountries('population');
        dropdownOrdenar.style.display = 'none';
    });

    document.getElementById('ordenarArea').addEventListener('click', () => {
        sortCountries('area');
        dropdownOrdenar.style.display = 'none';
    });
});
