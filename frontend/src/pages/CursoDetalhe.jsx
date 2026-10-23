import { useParams } from 'react-router-dom';

export default function CursoDetalhe() {
  const { id } = useParams();
  return (
    <div className="container" style={{ paddingBlock: 48 }}>
      <h1>Detalhes do curso {id} (provisório)</h1>
    </div>
  );
}