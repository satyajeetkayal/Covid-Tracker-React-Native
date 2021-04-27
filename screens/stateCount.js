import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import {Paper} from 'material-bread';
import {Searchbar} from 'react-native-paper';
import {Toast} from 'native-base';

const {height, width} = Dimensions.get('window');
const stateCount = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(true);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    stateData();
  }, []);

  const stateData = async () => {
    try {
      await axios
        .get('https://covid-india-cases.herokuapp.com/states/')
        .then(response => {
          setData(response.data);
          setFullData(response.data);
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

  const handleSearch = text => {
    const newData = fullData.filter(item => {
      const itemData = `${item.state.toLowerCase()}`;

      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    setQuery(text);
  };

  const onRefresh = () => {
    setData([]);
    stateData();
  };

  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator
            visible={isLoading}
            color="red"
            animating={true}
            style={{
              height: height,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size={30}
          />
        </View>
      ) : (
        <KeyboardAvoidingView behavior="height">
          <Searchbar
            placeholder="Search State..."
            style={{
              borderRadius: 10,
              borderColor: 'black',
              shadowColor: 'black',
              borderWidth: 0.5,
              left: 5,
              top: 2,
              backgroundColor: 'white',
              elevation: 20,
              width: width - 10,
            }}
            clearButtonMode="always"
            autoCapitalize="none"
            autoComplete={false}
            value={query}
            onEndEditing={() => handleSearch(query)}
            onChangeText={text => handleSearch(text)}
          />
          <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                enabled={true}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}, index) => (
              <View key={index}>
                <Paper style={styles.mainContainer}>
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}
                    numberOfLines={1}>
                    {item.state}
                  </Text>
                </Paper>
                <Paper style={styles.caseContainer} shadow={14}>
                  <Text>Cases</Text>
                  <Text style={styles.textContainer}>{item.noOfCases}</Text>
                </Paper>
                <Paper style={styles.recoverContainer} shadow={14}>
                  <Text>Recover</Text>
                  <Text style={styles.textContainer}>{item.cured}</Text>
                </Paper>
                <Paper style={styles.deathContainer} shadow={14}>
                  <Text>Deaths</Text>
                  <Text style={styles.textContainer}>{item.deaths}</Text>
                </Paper>
                <Paper style={styles.activeContainer} shadow={14}>
                  <Text>Active</Text>
                  <Text style={styles.textContainer}>{item.active}</Text>
                </Paper>
              </View>
            )}
          />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default stateCount;

const styles = StyleSheet.create({
  mainContainer: {
    height: 250,
    width: width,
    borderWidth: 0.1,
    top: 5,
  },
  activeContainer: {
    margin: 20,
    padding: 25,
    position: 'absolute',
    borderWidth: 1,
    top: 120,
    paddingRight: width - 110,
    elevation: 20,
    shadowColor: 'rgba(247, 202, 24, 1)',
    borderColor: 'rgba(247, 202, 24, 1)',
  },
  recoverContainer: {
    margin: 20,
    padding: 25,
    position: 'absolute',
    borderWidth: 0.5,
    top: 20,
    left: (width / 126) * 46,
    elevation: 20,
    shadowColor: 'green',
    borderColor: 'green',
  },
  caseContainer: {
    margin: 20,
    padding: 25,
    position: 'absolute',
    borderWidth: 0.5,
    top: 20,
    left: 15,
    elevation: 20,
    shadowColor: 'blue',
    borderColor: 'blue',
  },
  deathContainer: {
    margin: 20,
    padding: 25,
    position: 'absolute',
    borderWidth: 0.5,
    top: 20,
    left: width - 126,
    elevation: 20,
    shadowColor: 'red',
    borderColor: 'red',
  },
  textContainer: {
    fontWeight: 'bold',
  },
});
