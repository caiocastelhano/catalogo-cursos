import { Play } from './Icones.jsx';
import './VideoThumb.css';

export default function VideoThumb({ prioridade = false }) {
  return (
    <div className="video-thumb">
      <img
        src="/img/video-thumb.webp"
        alt="Dois profissionais de capacete e óculos de proteção conversam ao lado de uma máquina industrial"
        width="800"
        height="450"
        loading={prioridade ? 'eager' : 'lazy'}
        fetchPriority={prioridade ? 'high' : 'auto'}
        decoding="async"
      />
      <span className="video-thumb__play" aria-hidden="true">
        <Play />
      </span>
    </div>
  );
}
