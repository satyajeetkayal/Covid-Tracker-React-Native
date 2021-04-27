import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {Paper} from 'material-bread';
import {Toast} from 'native-base';
import {Tooltip} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const worldCount = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [current, setCurrent] = useState('');
  const [isRefreshing, setRefreshing] = useState(true);

  useEffect(() => {
    countData();
    update();
  }, []);

  const onRefresh = () => {
    //setData([]);
    countData();
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

  const update = () => {
    const date = moment().utcOffset('+5:30').format('hh:mm:ss A');
    setCurrent(date);
  };

  const countData = () => {
    try {
      axios
        .get('https://disease.sh/v3/covid-19/all')
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
  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator visible={isLoading} size={20} />
        </View>
      ) : (
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          enabled={true}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <ScrollView style={{backgroundColor: 'white'}}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                top: 5,
              }}>
              World
            </Text>
            <Text
              style={{
                justifyContent: 'flex-start',
                fontSize: 20,
                alignSelf: 'flex-start',
                top: 15,
                fontWeight: 'bold',
              }}>
              {`Last Updated ${current}`}
            </Text>
            <Paper style={styles.container}>
              <Text
                style={styles.textContainer}>{`Updated ${data.updated}`}</Text>
            </Paper>
            <Paper style={styles.caseContainer}>
              <Text style={styles.textContainer}>{`Cases ${data.cases}`}</Text>
            </Paper>
            <Paper style={styles.caseContainer}>
              <Text
                style={
                  styles.textContainer
                }>{`Today Cases ${data.todayCases}`}</Text>
            </Paper>
            <Paper style={styles.deathContainer}>
              <Text
                style={styles.textContainer}>{`Deaths ${data.deaths}`}</Text>
            </Paper>
            <Paper style={styles.deathContainer}>
              <Text style={styles.textContainer}>
                {`Today Deaths ${data.todayDeaths}`}
              </Text>
            </Paper>
            <Paper style={styles.recoverContainer}>
              <Text style={styles.textContainer}>
                {`Recovered ${data.recovered}`}
              </Text>
            </Paper>
            <Paper style={styles.recoverContainer}>
              <Text style={styles.textContainer}>
                {`Today Recovered ${data.todayRecovered}`}
              </Text>
            </Paper>
            <Paper style={styles.activeContainer}>
              <Text
                style={styles.textContainer}>{`Active ${data.active}`}</Text>
            </Paper>
            <Paper style={styles.container}>
              <Text
                style={
                  styles.textContainer
                }>{`Critical ${data.critical}`}</Text>
            </Paper>
            <Paper style={styles.container}>
              <Text style={styles.textContainer}>{`tests ${data.tests}`}</Text>
            </Paper>
            <Paper style={styles.container}>
              <Text style={styles.textContainer}>
                {`population ${data.population}`}
              </Text>
            </Paper>
            <Paper style={styles.container}>
              <Text style={styles.textContainer}>
                {`Affected Countries ${data.affectedCountries}`}
              </Text>
            </Paper>
            <Paper style={styles.caseContainer}>
              <Tooltip
                containerStyle={{borderRadius: 10}}
                backgroundColor="black"
                withOverlay={true}
                withPointer={true}
                pointerColor="black"
                popover={
                  <Text style={{color: 'white'}}>Cases Per One Million</Text>
                }>
                <Text style={styles.textContainer}>
                  {`CPOM ${data.casesPerOneMillion}`}
                </Text>
                <Icon
                  style={{position: 'absolute'}}
                  name="information-circle-outline"
                  size={20}
                />
              </Tooltip>
            </Paper>
            <Paper style={styles.deathContainer}>
              <Tooltip
                containerStyle={{borderRadius: 10}}
                backgroundColor="black"
                withOverlay={true}
                withPointer={true}
                pointerColor="black"
                popover={
                  <Text style={{color: 'white'}}>Deaths Per One Million</Text>
                }>
                <Text style={styles.textContainer}>
                  {`DPOM ${data.deathsPerOneMillion}`}
                </Text>
                <Icon
                  style={{position: 'absolute'}}
                  name="information-circle-outline"
                  size={20}
                />
              </Tooltip>
            </Paper>
            <Paper style={styles.activeContainer}>
              <Tooltip
                containerStyle={{borderRadius: 10}}
                backgroundColor="black"
                withOverlay={true}
                withPointer={true}
                pointerColor="black"
                popover={
                  <Text style={{color: 'white'}}>Active Per One Million</Text>
                }>
                <Text style={styles.textContainer}>
                  {`APOM ${data.activePerOneMillion}`}
                </Text>
                <Icon
                  style={{position: 'absolute'}}
                  name="information-circle-outline"
                  size={20}
                />
              </Tooltip>
            </Paper>
            <Paper style={styles.recoverContainer}>
              <Tooltip
                containerStyle={{borderRadius: 10}}
                backgroundColor="black"
                withOverlay={true}
                withPointer={true}
                pointerColor="black"
                popover={
                  <Text style={{color: 'white', width: 145}}>
                    Recovered Per One Million
                  </Text>
                }>
                <Text style={styles.textContainer}>
                  {`RPOM ${data.recoveredPerOneMillion}`}
                </Text>
                <Icon
                  style={{position: 'absolute'}}
                  name="information-circle-outline"
                  size={20}
                />
              </Tooltip>
            </Paper>
            <Paper style={styles.container}>
              <Tooltip
                containerStyle={{borderRadius: 10}}
                backgroundColor="black"
                withOverlay={true}
                withPointer={true}
                pointerColor="black"
                popover={
                  <Text style={{color: 'white'}}>Critical Per One Million</Text>
                }>
                <Text style={styles.textContainer}>
                  {`CPOM ${data.criticalPerOneMillion}`}
                </Text>
                <Icon
                  style={{position: 'absolute'}}
                  name="information-circle-outline"
                  size={20}
                />
              </Tooltip>
            </Paper>
          </ScrollView>
        </RefreshControl>
      )}
    </View>
  );
};

export default worldCount;

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
    fontWeight: 'bold',
  },
});
