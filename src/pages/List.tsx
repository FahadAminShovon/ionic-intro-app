import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { ResultsEntity, UsersResp } from './List.types';
import { addOutline, trashBinOutline } from 'ionicons/icons';

const getUsers = async () => {
  const data = await fetch('https://randomuser.me/api?results=10');
  const resp = (await data.json()) as UsersResp;
  return resp.results ?? [];
};

const List: React.FC = () => {
  const [users, setUsers] = useState<ResultsEntity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<ResultsEntity | null>(null);
  const modal = useRef<HTMLIonModalElement | null>(null);
  const cardModal = useRef<HTMLIonModalElement | null>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  const [activeSegment, setActiveSegment] = useState<string | number>(
    'details'
  );

  const page = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (page.current) {
      setPresentingElement(page.current);
    }
  }, []);

  useIonViewWillEnter(() => {
    const updateUsers = async () => {
      setLoading(true);
      const users = await getUsers();
      setUsers(users);
      setLoading(false);
    };
    updateUsers();
  });

  const clearList = () => {
    showAlert({
      header: 'Confirm !',
      message: 'Are you sure you want to delete all users?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            setUsers([]);
            showToast({
              message: 'All users deleted',
              duration: 2000,
              color: 'danger',
            });
          },
        },
      ],
    });
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={clearList}>
              <IonIcon
                slot='icon-only'
                icon={trashBinOutline}
                color={'light'}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={'success'}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher
          slot='fixed'
          onIonRefresh={async (e) => {
            setUsers([]);
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
            setLoading(false);
            e.detail.complete();
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {loading &&
          [...Array(10)].map((_, index) => (
            <IonCard key={index}>
              <IonCardContent className='ion-no-padding'>
                <IonItem lines='none'>
                  <IonAvatar slot='start'>
                    <IonSkeletonText />
                  </IonAvatar>
                  <IonLabel>
                    <IonSkeletonText animated style={{ width: '150px' }} />
                    <p>
                      <IonSkeletonText />
                    </p>
                  </IonLabel>
                  <IonChip slot='end' color={'primary'}></IonChip>
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}

        {users.map((user) => (
          <IonCard
            key={user.email}
            onClick={() => {
              setSelectedUser(user);
            }}
          >
            <IonCardContent className='ion-no-padding'>
              <IonItem lines='none'>
                <IonAvatar slot='start'>
                  <IonImg src={user.picture.thumbnail} />
                </IonAvatar>
                <IonLabel>
                  {user.name.first} {user.name.last}
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip slot='end' color={'primary'}>
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}
        <IonModal
          ref={modal}
          isOpen={selectedUser !== null}
          breakpoints={[0, 0.5, 0.8]}
          initialBreakpoint={0.5}
          onDidDismiss={() => {
            setSelectedUser(null);
          }}
        >
          <IonHeader>
            <IonToolbar color={'light'}>
              <IonTitle>
                {selectedUser?.name.first} {selectedUser?.name.last}
              </IonTitle>
              <IonButtons slot='start'>
                <IonButton
                  onClick={() => {
                    modal?.current?.dismiss();
                    setSelectedUser(null);
                  }}
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonSegment
                value={activeSegment}
                onIonChange={(e) => {
                  setActiveSegment(e.detail.value ?? '');
                }}
              >
                <IonSegmentButton value='details'>Detail</IonSegmentButton>
                <IonSegmentButton value='calendar'>Sheet</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            {activeSegment === 'details' && (
              <IonCard>
                <IonCardContent className='ion-no-padding'>
                  <IonItem lines='none'>
                    <IonAvatar slot='start'>
                      <IonImg src={selectedUser?.picture.thumbnail} />
                    </IonAvatar>
                    <IonLabel>
                      {selectedUser?.name.first} {selectedUser?.name.last}
                      <p>{selectedUser?.email}</p>
                    </IonLabel>
                    <IonChip slot='end' color={'primary'}>
                      {selectedUser?.nat}
                    </IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            )}
            {activeSegment === 'calendar' && (
              <IonGrid>
                <IonRow>
                  <IonCol
                    className='ion-justify-content-center'
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <IonDatetime />
                  </IonCol>
                </IonRow>
              </IonGrid>
            )}
          </IonContent>
        </IonModal>

        <IonModal
          ref={cardModal}
          trigger='card-modal'
          presentingElement={presentingElement ?? undefined}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Card modal</IonTitle>
              <IonButtons slot='start'>
                <IonButton
                  onClick={() => {
                    cardModal?.current?.dismiss();
                    setSelectedUser(null);
                  }}
                >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className='ion-padding'>
            <p>My Card Modal</p>
          </IonContent>
        </IonModal>
        <IonFab
          className='ion-margin-bottom'
          vertical='bottom'
          horizontal='end'
          slot='fixed'
        >
          <IonFabButton id='card-modal'>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default List;
