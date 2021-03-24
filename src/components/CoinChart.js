import { registerRootComponent } from 'expo';
import React from 'react';
import {View, Text, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

export default class CoinChart extends React.Component{
    render(){
        return(
            <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ]
                  }
                ]
              }}
              width={Dimensions.get("window").width} 
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} 
              chartConfig={{
                backgroundColor: "rgba(76,175,80,0.75)",
                backgroundGradientFrom: "rgba(76,175,80,0.75)",
                backgroundGradientTo: "rgba(76,175,80,0.75)",
                decimalPlaces: 2, 
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
    )}
}