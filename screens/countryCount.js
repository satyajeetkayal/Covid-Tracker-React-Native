import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import {Paper} from 'material-bread';
import {Toast} from 'native-base';
import moment from 'moment';

const countryCount = () => {
  const [data, setData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    countryData();
    update();
  }, []);

  const update = () => {
    var date = moment().utcOffset('+5:30').format('hh:mm:ss A');
    setCurrent(date);
  };

  const countryData = () => {
    try {
      axios
        .get(
          'https://corona.lmao.ninja/v2/countries/india?yesterday=true&strict=true&query',
        )
        .then(response => {
          setData(response.data);
          setLoading(false);
          setRefreshing(false);
        })
        .catch(error =>
          Toast.show({
            text: `${error.message}`,
            position: 'bottom',
            duration: 1500,
            textStyle: {color: 'white'},
            style: {backgroundColor: 'black'},
          }),
        );
    } catch (e) {
      return Toast.show({text: `${e.message}`});
    }
  };

  const onRefresh = () => {
    //setData([]);
    countryData();
    update();
    return loading();
  };

  const loading = () => {
    return Toast.show({
      text: 'Please Wait...',
      position: 'bottom',
      duration: 1200,
      textStyle: {color: 'white'},
      style: {backgroundColor: 'black'},
    });
  };
  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator visible={isLoading} size={20} />
        </View>
      ) : (
        <View>
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            enabled={true}>
            <ScrollView style={{backgroundColor: 'white'}}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  fontSize: 30,
                  top: 5,
                  fontWeight: 'bold',
                }}>
                {data.country}
              </Text>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  alignSelf: 'flex-start',
                  fontSize: 20,
                  top: 10,
                  fontWeight: 'bold',
                }}>
                {`Last Updated ${current}`}
              </Text>
              <Paper style={styles.container}>
                <Text
                  style={
                    styles.textContainer
                  }>{`Updated ${data.updated}`}</Text>
              </Paper>
              <Paper style={styles.caseContainer}>
                <Text
                  style={styles.textContainer}>{`Cases ${data.cases}`}</Text>
              </Paper>
              <Paper style={styles.caseContainer}>
                <Text
                  style={
                    styles.textContainer
                  }>{`Today Cases ${data.todayCases}`}</Text>
              </Paper>
              <Paper style={styles.recoverContainer}>
                <Text
                  style={
                    styles.textContainer
                  }>{`Recover ${data.recovered}`}</Text>
              </Paper>
              <Paper style={styles.recoverContainer}>
                <Text
                  style={
                    styles.textContainer
                  }>{`Today Recover ${data.todayRecovered}`}</Text>
              </Paper>
              <Paper style={styles.deathContainer}>
                <Text
                  style={styles.textContainer}>{`Deaths ${data.deaths}`}</Text>
              </Paper>
              <Paper style={styles.deathContainer}>
                <Text
                  style={
                    styles.textContainer
                  }>{`Today Deaths ${data.todayDeaths}`}</Text>
              </Paper>
              <Paper style={styles.activeContainer}>
                <Text
                  style={styles.textContainer}>{`Active ${data.active}`}</Text>
              </Paper>
            </ScrollView>
          </RefreshControl>
        </View>
      )}
    </View>
  );
};

export default countryCount;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 20,
    shadowColor: '#0abde3',
    borderColor: '#0abde3',
  },
  activeContainer: {
    margin: 20,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 20,
    shadowColor: 'rgba(247, 202, 24, 1)',
    borderColor: 'rgba(247, 202, 24, 1)',
  },
  caseContainer: {
    margin: 20,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 20,
    shadowColor: 'blue',
    borderColor: 'blue',
  },
  recoverContainer: {
    margin: 20,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 20,
    shadowColor: 'green',
    borderColor: 'green',
  },
  deathContainer: {
    margin: 20,
    padding: 25,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 20,
    shadowColor: 'red',
    borderColor: 'red',
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    fontSize: 20,
  },
});
