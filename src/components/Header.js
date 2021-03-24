import React from 'react';
import { View, Text, Dimensions } from 'react-native';

var width = Dimensions.get('window').width;

export default class Header extends React.Component {
    render() {
        return (
            <View>
                <Text style={{
                    fontSize: 32,
                    color: '#f2f2f2',
                    marginTop: 25,
                    marginLeft: -0.45 * width

                }}>KryptoBaron </Text>
            </View>
        )
    }

}

