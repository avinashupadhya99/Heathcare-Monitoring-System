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
import {CourierClient} from '@trycourier/courier';

import Header from './components/Header';
import Chart from './components/Chart';

const App = () => {
  const courier = CourierClient({
    authorizationToken: 'dk_prod_M03WT4ZE6A4B97GK2GCDBG8FBC9G',
  });
  const [thresholds, setThresholds] = useState({
    field1: 89,
    field2: 40,
    field3: 45,
    field4: 45,
    field5: 45,
  });
  const [feedValues, setFeedValues] = useState({});
  const [selectedFeed, setSelectedFeed] = useState('');
  const [selectedFeedNumber, setSelectedFeedNumber] = useState('field1');
  const [availableFeeds, setAvailableFeeds] = useState([]);
  const [textRef, setTextRef] = useState(null);

  const sendNotification = async data => {
    const {messageId} = await courier.send({
      eventId: 'RQEBE9G9YV42DKMJFF5NW9Q1Q4PT',
      recipientId: 'ed52d3a4-f19c-4913-97e8-e8306d17d823',
      profile: {
        email: 'avinashupadhya99@gmail.com',
        phone_number: '+919481029088',
      },
      data: data,
      override: {},
    });
    console.log(messageId);
  };

  useEffect(() => {
    fetch(
      'https://api.thingspeak.com/channels/1268340/feeds.json?api_key=RCW348S17GG6FXWT&days=9',
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
          if (feed.field1 > thresholds.field1) {
            sendNotification({
              feed: feedData.channel.field1,
              threshold: thresholds.field1,
              feedValue: feed.field1,
              dateTime: new Date(feed.created_at).toString(),
            });
          }
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
          if (feed.field2 > thresholds.field2) {
            sendNotification({
              feed: feedData.channel.field2,
              threshold: thresholds.field2,
              feedValue: feed.field2,
              dateTime: new Date(feed.created_at).toString(),
            });
          }
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
        setSelectedFeedNumber('field1');
        setAvailableFeeds(Object.keys(feedValue));
        console.log(feedValues);
      })
      .catch(fetchError => {
        console.error(fetchError);
      });
  }, []);

  const onChangeNumber = threshold => {
    // textRef.setValue(parseInt(threshold));
    console.log(textRef);
    console.log(threshold);
    let thresholdsCopy = thresholds;
    thresholdsCopy[selectedFeedNumber] = parseInt(threshold);
    setThresholds(thresholdsCopy);
    console.log(thresholds);
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
                  setSelectedFeedNumber(`field${itemIndex + 1}`);
                }}>
                {availableFeeds.map((feed, index) => {
                  return <Picker.Item label={feed} value={feed} key={index} />; //if you have a bunch of keys value pair
                })}
              </Picker>
            </View>
            <Chart name={selectedFeed} feedValues={feedValues[selectedFeed]} />
            <View>
              <Text style={styles.updateText}>
                Update threshold for{' '}
                <Text style={styles.updateTextFeedName}>{selectedFeed}</Text>
              </Text>
              <TextInput
                style={styles.updateThresholdInput}
                ref={ref => setTextRef(ref)}
                onChangeText={onChangeNumber}
                value={thresholds[selectedFeedNumber].toString()}
                placeholder="Threshold"
                keyboardType="numeric"
              />
            </View>
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
