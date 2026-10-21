import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";
import { getCharacters } from "../api";
import Portrait from "../components/Portrait";
import ScreenState from "../components/ScreenState";
import type { HunterCharacter } from "../types";

export default function CharactersPage() {
  const [characters, setCharacters] = useState<HunterCharacter[]>([]);
  const [error, setError] = useState("");

  const loadCharacters = () => {
    setError("");
    getCharacters().then(setCharacters).catch((reason: unknown) => {
      setError(reason instanceof Error ? reason.message : "No se pudieron cargar los cazadores.");
    });
  };

  useEffect(loadCharacters, []);

  return (
    <IonPage>
      <IonContent>
        <main className="page-shell">
          <header className="page-heading"><span className="system-kicker">REGISTRO DE CAZADORES</span><h1>Personajes</h1><p>Conoce a quienes cambiaron el destino de la humanidad.</p></header>
          {error ? <ScreenState message={`${error} Comprueba que el backend esté ejecutándose.`} onRetry={loadCharacters} /> : (
            <section className="character-grid">
              {characters.map((character) => (
                <Link to={`/characters/${character.id}`} className="character-card" key={character.id}>
                  <Portrait {...character} />
                  <div className="card-meta"><span>RANGO {character.rank}</span><span>{character.class}</span></div>
                </Link>
              ))}
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}
