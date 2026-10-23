import { Play } from './Icones.jsx';
import './VideoThumb.css';

export default function VideoThumb() {
  return (
    <div className="video-thumb">
      <img
        src="/img/video-thumb.webp"
        alt="Dois profissionais de capacete e óculos de proteção conversam ao lado de uma máquina industrial"
        loading="lazy"
      />
      <span className="video-thumb__play" aria-hidden="true">
        <Play />
      </span>
    </div>
  );
}