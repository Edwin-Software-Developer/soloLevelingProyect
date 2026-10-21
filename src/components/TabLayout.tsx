import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  apertureOutline,
  informationCircleOutline,
  personOutline,
  peopleOutline,
  playCircleOutline,
  pulseOutline,
} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CharactersPage from "../pages/CharactersPage";
import MomentsPage from "../pages/MomentsPage";
import AboutPage from "../pages/AboutPage";
import GamePage from "../pages/GamePage";
import HirePage from "../pages/HirePage";

export default function TabLayout() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home" component={HomePage} />
        <Route exact path="/tabs/characters" component={CharactersPage} />
        <Route exact path="/tabs/moments" component={MomentsPage} />
        <Route exact path="/tabs/about" component={AboutPage} />
        <Route exact path="/tabs/game" component={GamePage} />
        <Route exact path="/tabs/hire" component={HirePage} />
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home"><IonIcon icon={apertureOutline} /><span>Inicio</span></IonTabButton>
        <IonTabButton tab="characters" href="/tabs/characters"><IonIcon icon={peopleOutline} /><span>Cazadores</span></IonTabButton>
        <IonTabButton tab="moments" href="/tabs/moments"><IonIcon icon={playCircleOutline} /><span>Momentos</span></IonTabButton>
        <IonTabButton tab="game" href="/tabs/game"><IonIcon icon={pulseOutline} /><span>Jugar</span></IonTabButton>
        <IonTabButton tab="about" href="/tabs/about"><IonIcon icon={informationCircleOutline} /><span>Info</span></IonTabButton>
        <IonTabButton tab="hire" href="/tabs/hire"><IonIcon icon={personOutline} /><span>Contrátame</span></IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
