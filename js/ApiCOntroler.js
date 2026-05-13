async function cargarPaises() {
    const url = "https://raw.githubusercontent.com/millan2993/countries/master/json/countries.json";

    try {
        const response = await fetch(url);
        const data = await response.json();

        const paises = data.countries;

        const select = document.getElementById("paises");

        paises.sort((a, b) => a.name.localeCompare(b.name));

        paises.forEach(pais => {
            const option = document.createElement("option");

            option.value = pais.name;
            option.textContent = pais.name;

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Error:", error);
    }

    document.getElementById("paises").addEventListener("change", (e) => {
        console.log("Seleccionaste:", e.target.value);
    });
}

cargarPaises();

