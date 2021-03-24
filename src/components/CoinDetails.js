import React from 'react';
import { ScrollView, Text, StyleSheet, Dimensions, View, TouchableOpacity, Platform, PixelRatio } from 'react-native';
import CoinChart from '../components/CoinChart';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

class CoinDetails extends React.Component {
    state = {
        isLoading: true,
        dataSource: null, 
        fontSize: this.normalize(15) 
    }
    componentDidMount() {
        return fetch(`https://api.coingecko.com/api/v3/coins/${this.props.coinId}?localization=true`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                })
            })
            .catch((error => {
                console.log("error:" + error)
            }))


    }
    cutAboutCoinText(aboutCoinText) {
        let areAllTagsGone = false;
        while (areAllTagsGone == false) {
            aboutCoinText = aboutCoinText.replace(/<a\b[^>]*>/i, "")
            aboutCoinText = aboutCoinText.replace(/<\/a>/i, "")

            if (aboutCoinText.search("<a") == -1) {
                areAllTagsGone = true;
            }
        }
        return aboutCoinText

    }
    normalize(size) {
        const scale = width / 320;

        const newSize = size * scale
        if (Platform.OS === 'ios') {
            return Math.round(PixelRatio.roundToNearestPixel(newSize))
        } else {
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
        }
    }
    setScoreStyleColor(score){
        if(score>70) return "green";
        else if (score<=70 && score>=40) return "orange";
        else return "red"
    }
    render() {
        if (this.state.isLoading == true) {
            return (
                <View >
                    <Text>Loading....</Text>
                </View>
            );
        }
        else if (this.state.isLoading == false) {
            console.log(this.state.dataSource)
            return (
                <ScrollView >
                    <View style={stylesDetails.CoinsStyle}>
                        <Text style={{ fontSize: this.state.fontSize }}>Rank:  {this.state.dataSource.market_cap_rank}</Text>
                        <Text style={{ fontSize: this.state.fontSize }}>CoinGecko Score: 
                            <Text style={{color: this.setScoreStyleColor(this.state.dataSource.coingecko_score)}}> {this.state.dataSource.coingecko_score}</Text>
                        </Text>
                        <Text style={{ fontSize: this.state.fontSize }}>Community Score:
                            <Text style={{color: this.setScoreStyleColor(this.state.dataSource.community_score)}}> {this.state.dataSource.community_score}</Text>
                        </Text>
                        <Text style={{ fontSize: this.state.fontSize }}>Market Cap: {this.state.dataSource.market_data.market_cap.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} USD</Text>
                    </View>
                    <CoinChart ></CoinChart>

                    <View style={stylesDetails.CoinsStyleDetails}>
                        <Text style={{ fontSize: this.normalize(15) }}>{this.cutAboutCoinText(this.state.dataSource.description.en)}</Text>
                    </View>
                </ScrollView>
            );
        }

    }

};

const stylesDetails = StyleSheet.create({
    CoinsStyleDetails: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        margin: 20,
        width: width * 0.9,
        backgroundColor: "#f2f2f2",
        borderWidth: 5,
        borderColor: '#f2f2f2',
        borderRadius: 20,
    },
    CoinsStyle: {
        flex: 1,
        padding: 20,
        margin: 20,
        width: width * 0.9,
        backgroundColor: "#f2f2f2",
        borderWidth: 5,
        borderColor: '#f2f2f2',
        borderRadius: 20,
    }
})
export default CoinDetails;