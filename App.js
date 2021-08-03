import React, {useEffect, useState} from 'react';
import {
  Picker,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import Header from './components/Header';
import Chart from './components/Chart';

// To force update the text input (update threshold input)
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const App = () => {
  const [thresholds, setThresholds] = useState([]);
  const [feedValues, setFeedValues] = useState({});
  const [selectedFeed, setSelectedFeed] = useState('');
  const [selectedFeedNumber, setSelectedFeedNumber] = useState(0);
  const [availableFeeds, setAvailableFeeds] = useState([]);

  BackgroundTimer.runBackgroundTimer(() => {
    fetch(
      'https://api.thingspeak.com/channels/1268340/feeds.json?api_key=RCW348S17GG6FXWT&days=1&round=2',
    )
      .then(feedData => feedData.json())
      .then(feedData => {
        // console.log(feedData);
        let feedValue = {};
        feedData.feeds.map(feed => {
          // Heart Beat Sensor
          if (feedValue[feedData.channel.field1] === undefined) {
            // Initialize
            feedValue[feedData.channel.field1] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field1].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field1].value.push(feed.field1);
          // Body Temperature Sensor (LM35)
          if (feedValue[feedData.channel.field2] === undefined) {
            // Initialize
            feedValue[feedData.channel.field2] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field2].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field2].value.push(feed.field2);
          // Room Temperature Sensor (DHT11)
          if (feedValue[feedData.channel.field3] === undefined) {
            // Initialize
            feedValue[feedData.channel.field3] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field3].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field3].value.push(feed.field3);
          // CO Sensor (MQ-9)
          if (feedValue[feedData.channel.field4] === undefined) {
            // Initialize
            feedValue[feedData.channel.field4] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field4].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field4].value.push(feed.field4);
          // CO2 Sensor (MQ-135)
          if (feedValue[feedData.channel.field5] === undefined) {
            // Initialize
            feedValue[feedData.channel.field5] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field5].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field5].value.push(feed.field5);
        });
        // console.log(feedValue);
        setFeedValues(feedValue);
        // Set the first field as the default field
        setAvailableFeeds(Object.keys(feedValue));
        // console.log(feedValues);
      })
      .catch(fetchError => {
        console.error(fetchError);
      });
  }, 30000);

  useEffect(() => {
    fetch(
      'https://api.thingspeak.com/channels/1268340/feeds.json?api_key=RCW348S17GG6FXWT&days=1&round=2',
    )
      .then(feedData => feedData.json())
      .then(feedData => {
        // console.log(feedData);
        let feedValue = {};
        feedData.feeds.map(feed => {
          // Heart Beat Sensor
          if (feedValue[feedData.channel.field1] === undefined) {
            // Initialize
            feedValue[feedData.channel.field1] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field1].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field1].value.push(feed.field1);
          // Body Temperature Sensor (LM35)
          if (feedValue[feedData.channel.field2] === undefined) {
            // Initialize
            feedValue[feedData.channel.field2] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field2].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field2].value.push(feed.field2);
          // Room Temperature Sensor (DHT11)
          if (feedValue[feedData.channel.field3] === undefined) {
            // Initialize
            feedValue[feedData.channel.field3] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field3].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field3].value.push(feed.field3);
          // CO Sensor (MQ-9)
          if (feedValue[feedData.channel.field4] === undefined) {
            // Initialize
            feedValue[feedData.channel.field4] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field4].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field4].value.push(feed.field4);
          // CO2 Sensor (MQ-135)
          if (feedValue[feedData.channel.field5] === undefined) {
            // Initialize
            feedValue[feedData.channel.field5] = {
              datetime: [],
              value: [],
            };
          }
          feedValue[feedData.channel.field5].datetime.push(
            new Date(feed.created_at).toTimeString().substring(0, 5), // Get time in hh:mm
          );
          feedValue[feedData.channel.field5].value.push(feed.field5);
        });
        // console.log(feedValue);
        setFeedValues(feedValue);
        // Set the first field as the default field
        setSelectedFeed(Object.keys(feedValue)[0]);
        setSelectedFeedNumber(0);
        setAvailableFeeds(Object.keys(feedValue));
        console.log(feedValues);
      })
      .catch(fetchError => {
        console.error(fetchError);
      });
    // Fetch thresholds value
    fetch('http://35.238.20.42/')
      .then(response => response.json())
      .then(data => setThresholds(data));
  }, []);

  // To force update the text input (update threshold input)
  const forceUpdate = useForceUpdate();

  const onChangeNumber = threshold => {
    // textRef.setValue(parseInt(threshold));
    console.log(thresholds);
    console.log(threshold);
    let thresholdsCopy = thresholds;
    thresholdsCopy[selectedFeedNumber] = parseInt(threshold);
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({threshold: threshold, field: selectedFeedNumber}),
    };
    fetch('http://35.238.20.42/', requestOptions).then(response =>
      console.log(response),
    );
    setThresholds(thresholdsCopy);
    console.log(thresholds);
    forceUpdate();
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        {feedValues ? (
          <>
            <View>
              <Picker
                selectedValue={selectedFeed}
                style={styles.feedDropDown}
                onValueChange={(feed, itemIndex) => {
                  setSelectedFeed(feed);
                  setSelectedFeedNumber(itemIndex);
                }}>
                {availableFeeds.map((feed, index) => {
                  return <Picker.Item label={feed} value={feed} key={index} />; //if you have a bunch of keys value pair
                })}
              </Picker>
            </View>
            <Chart name={selectedFeed} feedValues={feedValues[selectedFeed]} />
            {thresholds.length > 0 ? (
              <View>
                <Text style={styles.updateText}>
                  Update threshold for{' '}
                  <Text style={styles.updateTextFeedName}>{selectedFeed}</Text>
                </Text>
                <TextInput
                  style={styles.updateThresholdInput}
                  onChangeText={onChangeNumber}
                  value={thresholds[selectedFeedNumber].toString()}
                  placeholder="Threshold"
                  keyboardType="numeric"
                />
              </View>
            ) : (
              <View />
            )}
          </>
        ) : (
          <View>
            <Text>Loading</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  feedDropDown: {
    height: 50,
  },
  updateText: {
    fontSize: 20,
    fontWeight: '600',
  },
  updateTextFeedName: {
    color: '#fb8c00',
  },
  updateThresholdInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default App;
