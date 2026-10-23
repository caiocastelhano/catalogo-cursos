import { Link } from 'react-router-dom';

export default function NaoEncontrada() {
  return (
    <div className="container" style={{ paddingBlock: 48 }}>
      <h1>Página não encontrada</h1>
      <p style={{ marginBlock: 16 }}>O endereço acessado não existe.</p>
      <Link to="/" className="botao botao--preto">Voltar ao início</Link>
    </div>
  );
}