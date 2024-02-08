import {
  CreateAnimation,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useRef } from 'react';

const Tab2: React.FC = () => {
  const animationRef = useRef<CreateAnimation | null>(null);

  useIonViewDidEnter(() => {
    // animationRef.current?.animation.play();
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <CreateAnimation
          duration={2000}
          iterations={Infinity}
          delay={1000}
          ref={animationRef}
          keyframes={[
            { offset: 0, transform: 'scale(1)', opacity: '1' },
            { offset: 0.5, transform: 'scale(1.5)', opacity: '0.5' },
            { offset: 1, transform: 'scale(1)', opacity: '1' },
          ]}
        >
          <IonButton color='success' className='ion-margin' expand='block'>
            Test Ionic
          </IonButton>
        </CreateAnimation>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
