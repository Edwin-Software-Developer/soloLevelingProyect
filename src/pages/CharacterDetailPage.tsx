import { useEffect, useState } from "react";
import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import { useParams } from "react-router-dom";
import { getCharacter } from "../api";
import Portrait from "../components/Portrait";
import ScreenState from "../components/ScreenState";
import type { HunterCharacter } from "../types";

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<HunterCharacter | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCharacter(id).then(setCharacter).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "No se pudo cargar el personaje.");
    });
  }, [id]);

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/tabs/characters" text="Volver" /></IonButtons></IonToolbar></IonHeader>
      <IonContent>
        {error ? <ScreenState message={error} /> : character && (
          <main className="detail-shell">
            <Portrait {...character} large />
            <section className="detail-copy">
              <span className="system-kicker">ARCHIVO DE CAZADOR · {character.rank}</span>
              <h1>{character.name}</h1>
              <div className="stats-grid">
                <div><span>Rango</span><strong>{character.rank}</strong></div>
                <div><span>Clase</span><strong>{character.class}</strong></div>
                <div><span>Gremio</span><strong>{character.guild}</strong></div>
              </div>
              <h2>Biografía</h2><p>{character.biography}</p>
            </section>
          </main>
        )}
      </IonContent>
    </IonPage>
  );
}
