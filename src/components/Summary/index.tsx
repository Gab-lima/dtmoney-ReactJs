import iconmeImg from "../../assets/img/entradas.svg";
import saidasImg from "../../assets/img/saidas.svg";
import totalImg from "../../assets/img/total.svg";

import { Container } from "./styles";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={iconmeImg} alt="" />
        </header>
        <strong>R$1000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={saidasImg} alt="" />
        </header>
        <strong>- R$500,00</strong>
      </div>

      <div className="highligh-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="" />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  );
}
