import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import { Redirect, Route } from 'react-router';
import List from './List';
import Settings from './Settings';
import { homeOutline, newspaperOutline } from 'ionicons/icons';

const Menu: React.FC = () => {
  const paths = [
    { name: 'Home', url: '/app/list', icon: homeOutline },
    { name: 'Settings', url: '/app/settings', icon: newspaperOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId='main'>
        <IonMenu contentId='main'>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {paths.map((item) => (
              <IonMenuToggle key={item.name} autoHide={false}>
                <IonItem
                  detail={false}
                  routerLink={item.url}
                  routerDirection='none'
                >
                  <IonIcon slot='start' icon={item.icon} />
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id='main'>
          <Route exact path={'/app/list'} component={List} />
          <Route exact path={'/app/settings'} component={Settings} />
          <Route exact path={'/app'} component={List}>
            <Redirect to='/app/list' />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
