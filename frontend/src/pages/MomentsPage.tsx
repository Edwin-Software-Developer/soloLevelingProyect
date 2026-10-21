import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import type { CSSProperties } from "react";
import { getMoments } from "../api";
import ScreenState from "../components/ScreenState";
import type { StoryMoment } from "../types";

export default function MomentsPage() {
  const [moments, setMoments] = useState<StoryMoment[]>([]);
  const [error, setError] = useState("");
  const loadMoments = () => {
    setError("");
    getMoments().then(setMoments).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "No se pudieron cargar los momentos.");
    });
  };
  useEffect(loadMoments, []);

  return (
    <IonPage>
      <IonContent>
        <main className="page-shell">
          <header className="page-heading"><span className="system-kicker">RECUERDOS DEL DUNGEON</span><h1>Momentos</h1><p>Escenas que marcaron la historia del cazador más débil.</p></header>
          {error ? <ScreenState message={`${error} Comprueba que el backend esté ejecutándose.`} onRetry={loadMoments} /> : (
            <section className="moment-grid">
              {moments.map((moment, index) => (
                <Link to={`/moments/${moment.id}`} className="moment-card" key={moment.id} style={{ "--moment-accent": moment.accent } as CSSProperties}>
                  <div className="moment-art"><span>0{index + 1}</span><div className="play-mark">▶</div></div>
                  <div className="moment-copy"><h2>{moment.title}</h2><p>{moment.description}</p><span className="text-link">VER MOMENTO ↗</span></div>
                </Link>
              ))}
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
