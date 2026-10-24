import { Seta } from './Icones.jsx';
import './SetaAnimada.css';

export default function SetaAnimada({ tamanho = 20 }) {
  return (
    <span className="seta-animada" style={{ width: tamanho, height: tamanho }} aria-hidden="true">
      <span className="seta-animada__saida">
        <Seta tamanho={tamanho} />
      </span>
      <span className="seta-animada__entrada">
        <Seta tamanho={tamanho} />
      </span>
    </span>
  );
}
