import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Platform, PixelRatio, TouchableOpacity } from 'react-native';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;




class Coin extends Component {
    state = {
        price: this.props.coin.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    checkChangeLastTwentyFourHours() {
        if (this.props.coin.market_cap_change_percentage_24h > 0) return "green"
        else if (this.props.coin.market_cap_change_percentage_24h < 0) return "red"
        else return "yellow"

    }
    checkRankNumberSize(){
        if(this.props.coin.market_cap_rank>99) return width / 26;
        else if(this.props.coin.market_cap_rank>9) return width / 16;
        else return width / 15;
    }


    render() {

        return (
            <TouchableOpacity onPress={() => this.props.changeView(this.props.coin.id, true)} style={styles.CoinsStyle} >

                <View style={styles.rank}>
                    <Text style={{marginLeft: this.checkRankNumberSize(), marginTop: (height) / 14,fontSize: width / 15}}>{this.props.coin.market_cap_rank}.</Text>
                </View>
                <React.Fragment>
                    <Text style={styles.name}>{this.props.coin.name}</Text>
                </React.Fragment>

                <View style={styles.logoFragmenrt}>
                    <Image style={styles.tinyLogo} source={{ uri: this.props.coin.image }} />
                    <Text style={styles.symbol}> {this.props.coin.symbol.toUpperCase()}</Text>

                </View>

                <React.Fragment >
                    <Text style={styles.percentageOfCoin}><Text style={{ color: this.checkChangeLastTwentyFourHours() }} >{this.props.coin.market_cap_change_percentage_24h}%</Text></Text>

                    <Text style={styles.price}>{this.state.price} USD/1</Text>
                </React.Fragment>


            </TouchableOpacity>
        )


    }
}

const styles = StyleSheet.create({

    CoinsStyle: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        margin: 20,
        width: width * 0.9,
        backgroundColor: "#f2f2f2",
        borderWidth: 5,
        borderColor: '#f2f2f2',
        borderRadius: 20,
        height: height * 0.2,
    },
    tinyLogo: {
        flex: 1,
        alignItems: 'center',
        width: 70,
        height: 50,
    },
    rank: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderWidth: 5,
        borderColor: '#fff',
        borderRadius: 20,
        width: width * 0.2,
        height: height * 0.21,
        marginTop: -height * 0.01,
        marginLeft: -width * 0.05


    },
    rankText: {
        marginTop: (height) / 14,
        fontSize: width / 15


    },
    price: {
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    percentageOfCoin: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: height * 0.03,

    },
    name: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: width * 0.01
    },
    symbol: {
        alignItems: 'center',
        marginLeft: 17,
    }



});
export default Coin;