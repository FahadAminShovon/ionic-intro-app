import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  // useIonRouter,
} from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import FCC from '../assets/fcc.svg';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
const INTRO_KEY = 'intro-seen';

const Login: React.FC = () => {
  const [intorSeen, setIntroSeen] = useState(false);
  const [present, dismiss] = useIonLoading();
  const router = useIonRouter();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen?.value === 'true');
    };
    checkStorage();
  }, []);
  const doLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    present('Loggin in...');
    setTimeout(() => {
      dismiss();
      router.push('/app', 'root');
    }, 2000);
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: 'true' });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

  return (
    <>
      {!intorSeen ? (
        <Intro onFinish={finishIntro} />
      ) : (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>FCC Login</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent className='ion-padding' scrollY={false}>
            <IonGrid fixed>
              <IonRow className='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                  <div className='ion-text-center'>
                    <img src={FCC} alt='FCC Logo' width={'50%'} />
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonGrid fixed>
              <IonRow className='ion-justify-content-center'>
                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                  <IonCard>
                    <IonCardContent>
                      <form onSubmit={doLogin}>
                        <IonInput
                          label='Email'
                          type='email'
                          placeholder='test@gmail.com'
                          labelPlacement='floating'
                          fill='outline'
                        />

                        <IonInput
                          label='Password'
                          type='password'
                          labelPlacement='floating'
                          fill='outline'
                          placeholder='*****'
                          className='ion-margin-top'
                        />
                        <IonButton
                          type='submit'
                          expand='full'
                          className='ion-margin-top'
                        >
                          Login
                          <IonIcon icon={logInOutline} slot='end' />
                        </IonButton>
                        <IonButton
                          routerLink='/register'
                          color={'secondary'}
                          expand='full'
                          className='ion-margin-top'
                        >
                          Create account
                          <IonIcon icon={personCircleOutline} slot='end' />
                        </IonButton>
                        <IonButton
                          color={'medium'}
                          expand='full'
                          className='ion-margin-top'
                          onClick={seeIntroAgain}
                          fill='clear'
                        >
                          Watch intro again
                          <IonIcon icon={personCircleOutline} slot='end' />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
