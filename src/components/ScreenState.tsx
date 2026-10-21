import { IonButton, IonText } from "@ionic/react";

interface ScreenStateProps {
  message: string;
  onRetry?: () => void;
}

export default function ScreenState({ message, onRetry }: ScreenStateProps) {
  return (
    <div className="screen-state" role="status">
      <span className="system-kicker">SISTEMA</span>
      <IonText color="light"><p>{message}</p></IonText>
      {onRetry && <IonButton fill="outline" onClick={onRetry}>Reintentar</IonButton>}
    </div>
  );
}
