import { Button, Message, Select } from "semantic-ui-react";

import "./Conversor.css";

const Conversor = ({
  from,
  to,
  data,
  error,
  onFromChange,
  onToChange,
  onVider,
  onConvertir,
}) => {
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
          <Message success>
            <p>
              1 {from} = {data} {to}
            </p>
          </Message>
        ) : error ? (
          <Message error>{error}</Message>
        ) : undefined}
      </div>
    </div>
  );
};

export default Conversor;
