import { useEffect, useState } from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getMoment } from "../api";
import ScreenState from "../components/ScreenState";
import type { StoryMoment } from "../types";

export default function MomentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [moment, setMoment] = useState<StoryMoment | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getMoment(id).then(setMoment).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "No se pudo cargar el momento.");
    });
  }, [id]);

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/tabs/moments" text="Volver" /></IonButtons></IonToolbar></IonHeader>
      <IonContent>
        {error ? <ScreenState message={error} /> : moment && (
          <main className="detail-shell moment-detail">
            <span className="system-kicker">REPRODUCCIÓN LOCAL · MOMENTO</span>
            <h1>{moment.title}</h1>
            <p>{moment.description}</p>
            {moment.videoUrl ? (
              <video className="moment-video" controls playsInline preload="metadata" poster={moment.posterUrl ?? undefined}>
                <source src={moment.videoUrl} />
                Tu navegador no puede reproducir este video.
              </video>
            ) : (
              <div className="video-placeholder">
                <div className="play-mark">▶</div>
                <strong>Clip no configurado</strong>
                <span>Agrega un archivo de video con licencia en el backend para reproducirlo aquí.</span>
              </div>
            )}
          </main>
        )}
      </IonContent>
    </IonPage>
  );
}
