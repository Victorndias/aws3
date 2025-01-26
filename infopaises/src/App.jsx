import { useState } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio("/som/cidade.mp3");

  const fetchCountryData = () => {
    if (!country) return;

    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => {
        setData(response.data[0]);
        setError(null);
      })
      .catch(() => setError("País não encontrado!"));
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0; // Reinicia o áudio ao parar
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
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

      <button
        onClick={toggleAudio}
        style={{
          marginLeft: "10px",
          padding: "10px",
          backgroundColor: isPlaying ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isPlaying ? "Parar Som" : "Tocar Som da Cidade"}
      </button>

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