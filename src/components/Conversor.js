import { Button, Select } from "semantic-ui-react";
import { useState } from "react";

import "./Conversor.css";

const Conversor = () => {
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

  const optionsFor = [
    { value: "bitcoin", key: "btc", text: "Bitcoin" },
    { value: "lithium", key: "lithium", text: "Lithium" },
  ];

  const optionsTo = [
    { value: "cad", key: "cad", text: "Dollar Canadien" },
    { value: "usd", key: "usd", text: "Dollar Americain" },
  ];

  return (
    <div className="conversor-component">
      <h1>Convertisseur de monnaie</h1>
      <div className="selection">
        <Select
          className="select"
          placeholder="Choisissez une monaie de départ"
          options={optionsFor}
          value={from}
          onChange={onFromChange}
        />
        <Select
          className="select"
          placeholder="Convertir en ?"
          options={optionsTo}
          value={to}
          onChange={onToChange}
        />
        <Button color="blue" onClick={() => onConvertir(from, to)}>
          Convertir la monnaie
        </Button>
        <Button color="black" onClick={onVider}>
          Vider
        </Button>
      </div>
      <div className="result">
        {data ? (
          <h3>
            1 {from} = {data} {to}
          </h3>
        ) : error ? (
          <h3>{error}</h3>
        ) : undefined}
      </div>
    </div>
  );
};

export default Conversor;
