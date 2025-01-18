import { useState } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCountryData = () => {
    if (!country) return; // Evita requisição vazia

    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => {
        setData(response.data[0]); // Pegando o primeiro resultado
        setError(null);
      })
      .catch(() => setError("País não encontrado!"));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌍 Buscador de Países</h1>
      <input
        type="text"
        placeholder="Digite o nome do país"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <button onClick={fetchCountryData}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div>
          <h2>{data.name.common}</h2>
          <p>Capital: {data.capital?.[0]}</p>
          <p>População: {data.population}</p>
          <p>Continente: {data.continents?.[0]}</p>
          <img src={data.flags?.png} alt="Bandeira" width="150" />
        </div>
      )}
    </div>
  );
}

export default App;
