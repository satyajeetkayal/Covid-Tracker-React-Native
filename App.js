import React from 'react';
import {View, Text} from 'react-native';
import ScreenNavigation from './ScreenNavigation';
import 'react-native-gesture-handler';
import {BreadProvider} from 'material-bread';
import {Root} from 'native-base';
import {Network} from './component';
export default function App() {
  return (
    <View style={{flex: 1}}>
      <BreadProvider>
        <Root>
          <ScreenNavigation />
          <Network />
        </Root>
      </BreadProvider>
    </View>
  );
}
