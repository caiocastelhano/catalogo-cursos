import './Beneficios.css';

export default function Beneficios({ itens, cor = 'bege' }) {
  return (
    <ul className="beneficios">
      {itens.map((item) => (
        <li key={item.id} className="beneficios__item">
          <img src={`/icons/${item.icone}-${cor}.svg`} alt="" width="48" height="48" />
          <h3 className="beneficios__titulo">{item.titulo}</h3>
          <p className="beneficios__texto">{item.texto}</p>
        </li>
      ))}
    </ul>
  );
}