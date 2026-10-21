import { IonContent, IonPage } from "@ionic/react";

const profilePhoto = import.meta.env.VITE_PROFILE_PHOTO_URL as string | undefined;

export default function HirePage() {
  return (
    <IonPage>
      <IonContent>
        <main className="page-shell hire-shell">
          <section className="profile-card">
            <div className="profile-photo">
              {profilePhoto ? <img src={profilePhoto} alt="Edwin Perez" /> : <span>EP</span>}
            </div>
            <span className="system-kicker">PERFIL DE CAZADOR · DISPONIBLE</span>
            <h1>Edwin Perez</h1>
            <p>Estudiante de término de desarrollo de software en el ITLA</p>
            <div className="contact-actions">
              <a className="contact-button" href="mailto:edwin.perez@example.com">Correo electrónico</a>
              <a className="contact-button" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="contact-button" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <small>Configura tus enlaces reales en <code>frontend/src/pages/HirePage.tsx</code>.</small>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
}
