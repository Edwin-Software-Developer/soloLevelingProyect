import { IonContent, IonPage } from "@ionic/react";

export default function AboutPage() {
  return (
    <IonPage>
      <IonContent>
        <main className="page-shell about-shell">
          <section className="system-panel">
            <span className="system-kicker">VENTANA DEL SISTEMA · INFORMACIÓN</span>
            <h1>Acerca de<br /><em>Solo Leveling</em></h1>
            <p className="about-intro">Un portal a la historia de Sung Jinwoo, presentada como una interfaz del Sistema.</p>
            <div className="system-record"><span>ANIME</span><strong>2 temporadas emitidas</strong></div>
            <div className="system-record"><span>ESTUDIO DE ANIMACIÓN</span><strong>A-1 Pictures</strong></div>
            <div className="system-record"><span>CREADORES</span><strong>Chugong · DUBU (REDICE Studio)</strong></div>
            <p className="fine-print">Proyecto de fan no oficial. No está afiliado ni respaldado por los titulares de derechos de Solo Leveling.</p>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
}
