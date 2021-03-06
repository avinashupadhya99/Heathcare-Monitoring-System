import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Chart = ({name, feedValues}) => {
  if (feedValues) {
    return (
      <View>
        <Text>{name}</Text>
        <ScrollView
          horizontal={true}
          contentOffset={{x: 0, y: 0}} // middle of the graph
          showsHorizontalScrollIndicator={false} // to hide scroll bar
        >
          <LineChart
            data={{
              labels: feedValues.datetime,
              datasets: [
                {
                  data: feedValues.value,
                },
              ],
              legend: [name],
            }}
            width={feedValues.value.length * 50}
            height={220}
            yAxisInterval={20} // optional, defaults to 1,
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
            style={styles.lineChart}
          />
        </ScrollView>
      </View>
    );
  } else {
    return <ActivityIndicator color={'#fb8c00'} />;
  }
};

const styles = StyleSheet.create({
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Chart;
