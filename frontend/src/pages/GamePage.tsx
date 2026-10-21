import { useEffect, useState } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";

const ROUND_SECONDS = 20;
const PORTAL_LIFETIME_MS = 1_150;
const LEVELS = [
  { rank: "E", exp: 0 },
  { rank: "D", exp: 50 },
  { rank: "C", exp: 120 },
  { rank: "B", exp: 220 },
  { rank: "A", exp: 350 },
  { rank: "S", exp: 500 },
];

interface Portal {
  id: number;
  x: number;
  y: number;
}

export default function GamePage() {
  const [playing, setPlaying] = useState(false);
  const [seconds, setSeconds] = useState(ROUND_SECONDS);
  const [exp, setExp] = useState(0);
  const [portal, setPortal] = useState<Portal | null>(null);
  const [message, setMessage] = useState("Cierra los portales antes de que desaparezcan.");

  const rank = [...LEVELS].reverse().find((level) => exp >= level.exp)?.rank ?? "E";
  const nextLevel = LEVELS.find((level) => level.exp > exp);
  const progress = nextLevel
    ? ((exp - (LEVELS.find((level) => level.rank === rank)?.exp ?? 0)) /
      (nextLevel.exp - (LEVELS.find((level) => level.rank === rank)?.exp ?? 0))) * 100
    : 100;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setSeconds((remaining) => {
        if (remaining <= 1) {
          setPlaying(false);
          setPortal(null);
          setMessage("Tiempo terminado. Tu experiencia se conserva; vuelve a intentarlo.");
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing || !portal) return;
    const expiry = window.setTimeout(() => {
      setPortal((current) => current?.id === portal.id ? null : current);
    }, PORTAL_LIFETIME_MS);
    return () => window.clearTimeout(expiry);
  }, [playing, portal]);

  useEffect(() => {
    if (!playing || portal) return;
    const spawn = window.setTimeout(() => {
      setPortal({
        id: Date.now() + Math.random(),
        x: 8 + Math.random() * 78,
        y: 8 + Math.random() * 72,
      });
    }, 320);
    return () => window.clearTimeout(spawn);
  }, [playing, portal]);

  const startGame = () => {
    setSeconds(ROUND_SECONDS);
    setPortal(null);
    setMessage("¡Dungeon activo! Toca cada portal para sellarlo.");
    setPlaying(true);
  };

  const closePortal = () => {
    if (!portal) return;
    setExp((current) => current + 10);
    setPortal(null);
  };

  return (
    <IonPage>
      <IonContent>
        <main className="page-shell game-shell">
          <header className="page-heading"><span className="system-kicker">MODO ENTRENAMIENTO · DUNGEON CLICKER</span><h1>Sube de nivel</h1><p>{message}</p></header>
          <section className="game-stats">
            <div><span>RANGO</span><strong>{rank}</strong></div>
            <div><span>EXP</span><strong>{exp}</strong></div>
            <div><span>TIEMPO</span><strong>{seconds}s</strong></div>
          </section>
          <div className="xp-track" aria-label={`Progreso al siguiente rango: ${Math.round(progress)} por ciento`}><div style={{ width: `${progress}%` }} /></div>
          <p className="next-rank">{nextLevel ? `${nextLevel.exp - exp} EXP para rango ${nextLevel.rank}` : "RANGO S ALCANZADO"}</p>
          <section className={`dungeon-field${playing ? " is-active" : ""}`} aria-label="Campo de juego">
            <div className="dungeon-grid" />
            {portal && playing && (
              <button
                className="portal-target"
                style={{ left: `${portal.x}%`, top: `${portal.y}%` }}
                onClick={closePortal}
                aria-label="Cerrar portal y ganar 10 EXP"
              >
                <span />
              </button>
            )}
            {!playing && <div className="dungeon-overlay"><span>{seconds === 0 ? "RUN COMPLETADA" : "DUNGEON EN ESPERA"}</span></div>}
          </section>
          <IonButton expand="block" className="glow-button game-start" onClick={startGame} disabled={playing}>
            {playing ? "Dungeon en curso..." : seconds === 0 ? "Jugar otra vez" : "Iniciar dungeon"}
          </IonButton>
          <p className="game-hint">20 segundos · cada portal sellado otorga 10 EXP · alcanza el rango S con 500 EXP.</p>
        </main>
      </IonContent>
    </IonPage>
  );
}
