import './TagCategoria.css';

const CATEGORIAS = {
  'Matemática': { icone: 'icon-matematica-20px', classe: 'matematica' },
  'Ciências da Natureza': { icone: 'icon-ciencias-natureza-20px', classe: 'ciencias' },
  Linguagens: { icone: 'icon-linguagens-20px', classe: 'linguagens' },
};

export default function TagCategoria({ categoria }) {
  const dados = CATEGORIAS[categoria] ?? { icone: null, classe: 'padrao' };

  return (
    <span className={`tag-categoria tag-categoria--${dados.classe}`}>
      {dados.icone && <img src={`/icons/${dados.icone}.svg`} alt="" width="16" height="16" />}
      {categoria}
    </span>
  );
}