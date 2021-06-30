import React, {useEffect, useState} from 'react';
import {Picker, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import Header from './components/Header';
import Chart from './components/Chart';

const App = () => {
  const [feedValues, setFeedValues] = useState({});
  const [selectedFeed, setSelectedFeed] = useState('');
  const [availableFeeds, setAvailableFeeds] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.thingspeak.com/channels/1268340/feeds.json?api_key=RCW348S17GG6FXWT',
    )
      .then(feedData => feedData.json())
      .then(feedData => {
        // console.log(feedData);
        let feedValue = {};
        feedData.feeds.map(feed => {
          // Heart Beat Sensor
          if (feedValue[feedData.channel.field1] === undefined) {
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
        setSelectedFeed(Object.keys(feedValue)[0]);
        setAvailableFeeds(Object.keys(feedValue));
      })
      .catch(fetchError => {
        console.error(fetchError);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Picker
            selectedValue={selectedFeed}
            style={styles.feedDropDown}
            onValueChange={(feed, itemIndex) => setSelectedFeed(feed)}>
            {availableFeeds.map((feed, index) => {
              return <Picker.Item label={feed} value={feed} key={index} />; //if you have a bunch of keys value pair
            })}
          </Picker>
        </View>
        <Chart name={selectedFeed} feedValues={feedValues[selectedFeed]} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  feedDropDown: {
    height: 50,
  },
});

export default App;
