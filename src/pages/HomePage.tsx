import { IonButton, IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";

const heroImageUrl = import.meta.env.VITE_HOME_HERO_IMAGE_URL as string | undefined;

export default function HomePage() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="home-hero">
          <div className="hero-orb hero-orb-one" />
          <div className="hero-orb hero-orb-two" />
          <div className="hero-carousel" aria-hidden="true">
            <div className={`hero-slide hero-slide-hunter${heroImageUrl ? " has-hero-image" : ""}`}>
              {heroImageUrl ? (
                <img className="hero-photo" src={heroImageUrl} alt="" />
              ) : (
                <div className="hero-figure" />
              )}
              <span className="slide-label">EL CAZADOR</span>
            </div>
            <div className="hero-slide hero-slide-army">
              <div className="hero-army"><i /><i /><i /><i /><i /></div>
              <div className="hero-figure" />
              <span className="slide-label">EJÉRCITO DE SOMBRAS</span>
            </div>
            <div className="hero-slide hero-slide-monarch">
              <div className="hero-figure" />
              <span className="slide-label">MONARCA DE LAS SOMBRAS</span>
            </div>
          </div>
          <div className="hero-grid" />
          <div className="hero-copy">
            <span className="system-kicker">PORTAL DETECTADO · RANGO S</span>
            <h1>EL SISTEMA<br /><em>TE ELIGIÓ</em></h1>
            <p>Un cazador. Un ejército de sombras. Un mundo que subir de nivel.</p>
            <div className="hero-actions">
              <IonButton routerLink="/tabs/characters" className="glow-button">Explorar cazadores</IonButton>
              <IonButton fill="outline" routerLink="/tabs/game">Entrar al dungeon</IonButton>
            </div>
            <Link to="/tabs/about" className="hero-note">[ ACCEDER A LOS DATOS DEL SISTEMA ]</Link>
          </div>
          <div className="hero-status" aria-hidden="true">
            <span>PLAYER: JINWOO</span><span>SHADOW ARMY: ACTIVE</span><span>LEVEL UP</span>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
}
