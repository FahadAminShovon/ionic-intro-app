import {
  IonBackButton,
  IonButton,
  IonButtons,
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
  useIonRouter,
} from '@ionic/react';
import React from 'react';

import { checkmarkDone } from 'ionicons/icons';

const Register: React.FC = () => {
  const router = useIonRouter();
  const doLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('doRegister');
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton defaultHref='/' />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className='ion-padding' scrollY={false}>
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
                      Create My Account
                      <IonIcon icon={checkmarkDone} slot='end' />
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;
