import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {Paper} from 'material-bread';
import {Searchbar} from 'react-native-paper';
import {Toast} from 'native-base';

const {height, width} = Dimensions.get('window');

const countriesCount = () => {
  const [data, setData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [fullData, setFullData] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    countriesData();
  }, []);

  const countriesData = async () => {
    try {
      await axios
        .get('https://disease.sh/v3/covid-19/countries')
        .then(response => {
          setData(response.data);
          setFullData(response.data);
          setRefreshing(false);
          setLoading(false);
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
    setData([]);
    countriesData();
  };

  const handleSearch = text => {
    const newData = fullData.filter(item => {
      const itemData = `${item.country.toLowerCase()}`;

      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setQuery(text);
    setData(newData);
  };

  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <Searchbar
            placeholder="Search Country..."
            style={{
              borderRadius: 10,
              borderColor: 'black',
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
                    }}>
                    {item.country}
                  </Text>
                </Paper>
                <Paper style={styles.caseContainer} shadow={14}>
                  <Text>Cases</Text>
                  <Text style={{fontWeight: 'bold'}}>{item.cases}</Text>
                </Paper>
                <Paper style={styles.recoverContainer} shadow={14}>
                  <Text>Recover</Text>
                  <Text style={{fontWeight: 'bold'}}>{item.recovered}</Text>
                </Paper>
                <Paper style={styles.deathContainer} shadow={14}>
                  <Text>Deaths</Text>
                  <Text style={{fontWeight: 'bold'}}>{item.deaths}</Text>
                </Paper>
                <Paper style={styles.activeContainer} shadow={14}>
                  <Text>Active</Text>
                  <Text style={{textAlign: 'justify'}}>{item.active}</Text>
                </Paper>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default countriesCount;

const styles = StyleSheet.create({
  mainContainer: {
    height: 250,
    width: width,
    borderWidth: 0.5,
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
});
