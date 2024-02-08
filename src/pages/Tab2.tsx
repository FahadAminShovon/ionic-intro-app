import {
  CreateAnimation,
  Gesture,
  GestureDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  createGesture,
  useIonViewDidEnter,
} from '@ionic/react';
import React, { useRef } from 'react';

const Tab2: React.FC = () => {
  const animationRef = useRef<CreateAnimation | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const onMoveHandler = (detail: GestureDetail) => {
    const x = detail.currentX - detail.startX;
    const y = detail.currentY - detail.startY;
    if (elementRef.current) {
      elementRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const onMoveEnd = (detail: GestureDetail) => {
    if (elementRef.current) {
      elementRef.current.style.transform = `translate(0px, 0px)`;
      elementRef.current.style.transition = `500ms ease-out`;
    }
  };

  const onStartHandler = (detail: GestureDetail) => {
    if (elementRef.current) {
      elementRef.current.style.transition = 'none';
    }
  };

  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();
    const gesture: Gesture = createGesture({
      el: elementRef.current!,
      gestureName: 'my-gesture',
      onMove: onMoveHandler,
      threshold: 0,
      onEnd: onMoveEnd,
      onStart: onStartHandler,
    });
    gesture.enable();
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
      <IonContent className='ion-padding' scrollY={false}>
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
        <div
          ref={elementRef}
          style={{ width: 50, height: 50, background: 'red' }}
        ></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
