import React, { Fragment } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Icon, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-get-random-values';

import Firebase, { FirebaseProvider } from './src/utils';
import TabNavigator from './src/navigation/TabNavigator';

const App = () => (
  <Fragment>
    <IconRegistry icons={EvaIconsPack} />    
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <FirebaseProvider value={Firebase}>
        <TabNavigator />
      </FirebaseProvider>
    </ApplicationProvider>
  </Fragment>
)

export default App;
