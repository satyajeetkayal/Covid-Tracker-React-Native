import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import * as Animatable from 'react-native-animatable';

const Network = () => {
  const [isConnected, setConnected] = useState(false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnected(state.isConnected);
      if (state.isConnected == false) {
        setMounted(true);
      }
    });
    NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
      if (state.isConnected == false) {
        setMounted(true);
      }
    });
  }, []);

  return (
    <>
      {!isConnected && (
        <Animatable.View
          style={{
            backgroundColor: 'red',
            borderTopLeftRadius: 40,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 2,
            top: 30,
            width: Dimensions.get('window').width / 1.5,
            height: 40,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 50,
          }}
          animation="fadeInDown">
          <View style={{flex: 2}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '700',
              }}>
              Oops! You're offline!
            </Text>
          </View>
        </Animatable.View>
      )}
      {isConnected && isMounted && (
        <Animatable.View
          style={{
            backgroundColor: 'green',
            borderTopLeftRadius: 40,
            flexDirection: 'row',
            position: 'absolute',
            zIndex: 2,
            top: 30,
            width: Dimensions.get('window').width / 1.5,
            height: 40,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            borderRadius: 50,
          }}
          animation="fadeOutUp"
          duration={5000}
          delay={2000}>
          <View style={{flex: 2}}>
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '700',
              }}>
              Wooh! You're back online!
            </Text>
          </View>
        </Animatable.View>
      )}
    </>
  );
};

export default Network;

const styles = StyleSheet.create({});
