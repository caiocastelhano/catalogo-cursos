import { useParams } from 'react-router-dom';

export default function SalaAula() {
  const { id } = useParams();
  return (
    <div className="container" style={{ paddingBlock: 48 }}>
      <h1>Sala de aula do curso {id} (provisória)</h1>
    </div>
  );
}