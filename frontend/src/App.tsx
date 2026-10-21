import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import TabLayout from "./components/TabLayout";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import MomentDetailPage from "./pages/MomentDetailPage";

export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabs" component={TabLayout} />
          <Route exact path="/characters/:id" component={CharacterDetailPage} />
          <Route exact path="/moments/:id" component={MomentDetailPage} />
          <Route exact path="/">
            <Redirect to="/tabs/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
