import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';

import Header from './components/Header';
import Chart from './components/Chart';

const App = () => {
  const [feedValues, setFeedValues] = useState({});

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
      })
      .catch(fetchError => {
        console.error(fetchError);
      });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        {Object.keys(feedValues).map((feedValue, index) => (
          <Chart
            name={feedValue}
            feedValues={feedValues[feedValue]}
            key={index}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
