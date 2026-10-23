import { Link } from 'react-router-dom';
import './Footer.css';

const navegacao = [
  { texto: 'Início', para: '/' },
  { texto: 'Certificação' },
  { texto: 'Cursos', para: '/cursos' },
  { texto: 'Sobre', para: '/#impacto' },
  { texto: 'Blog' },
];

const cursosPopulares = [
  'Cultura Organizacional',
  'Ferramentas Google para Produtividade',
  'Excel Básico ao Avançado',
  'Trabalho em Equipe e Colaboração',
  'Gestão do Tempo e Produtividade',
  'Comunicação Assertiva',
  'Inteligência Emocional no Trabalho',
];

const suporte = [
  'Termos de Uso',
  'Política de Privacidade',
  'Trabalhe Conosco',
  'Fale Conosco',
  'Central de Ajuda',
];

const redes = [
  { nome: 'LinkedIn', icone: '/icons/icon-linkedIn-24px.svg' },
  { nome: 'Instagram', icone: '/icons/icon-instagram-24px.svg' },
  { nome: 'Facebook', icone: '/icons/icon-facebook-24px.svg' },
];

function Coluna({ titulo, itens }) {
  return (
    <div>
      <h2 className="rodape__titulo">{titulo}</h2>
      <ul className="rodape__lista">
        {itens.map((item) => {
          const { texto, para } = typeof item === 'string' ? { texto: item } : item;
          return (
            <li key={texto}>
              {para ? <Link to={para}>{texto}</Link> : <span>{texto}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container">
        <div className="rodape__grade">
          <div>
            <img src="/icons/logo-sesi-industria-white.svg" alt="SESI+INDÚSTRIA" className="rodape__logo" />
            <p className="rodape__contato">contato@sesindustria.com.br</p>
            <p className="rodape__contato">Av. Paulista, 1313</p>
          </div>
          <Coluna titulo="Navegação" itens={navegacao} />
          <Coluna titulo="Cursos populares" itens={cursosPopulares} />
          <Coluna titulo="Suporte" itens={suporte} />
        </div>
        <div className="rodape__base">
          <p className="rodape__direitos">
            <img src="/icons/logo-sesi.svg" alt="SESI" />
            Todos os direitos reservados.
          </p>
          <ul className="rodape__redes">
            {redes.map((rede) => (
              <li key={rede.nome}>
                <img src={rede.icone} alt={rede.nome} width="24" height="24" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}