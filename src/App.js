import "./App.css";
import Conversor from "./components/Conversor";
import { useState } from "react";

function App() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const onFromChange = (e, data) => {
    setFrom(data.value);
    setData(null);
    setError(null);
  };

  const onToChange = (e, data) => {
    setTo(data.value);
    setData(null);
    setError(null);
  };

  const onVider = () => {
    setFrom("");
    setTo("");
    setData(null);
    setError(null);
  };

  const onConvertir = async (from, to) => {
    if (from && to) {
      try {
        let res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
        );
        let data = await res.json();
        setData(data[from][to]);
      } catch (e) {
        setError("Une erreur est survenue");
      }
    } else {
      setError("Merci de choisir les deux champs");
    }
  };

  return (
    <div className="App">
      <Conversor
        from={from}
        to={to}
        data={data}
        error={error}
        onFromChange={onFromChange}
        onToChange={onToChange}
        onVider={onVider}
        onConvertir={onConvertir}
      />
    </div>
  );
}

export default App;
