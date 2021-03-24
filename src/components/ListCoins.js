import React from 'react';
import { ScrollView, Text, TouchableOpacity, Dimensions, View, StyleSheet } from 'react-native';
import Coin from './Coins';
import CoinDetails from './CoinDetails'

var width = Dimensions.get('window').width;

export default class ListCoins extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            dataSource: null,
            howManyCoins: 10,
            showingCoinsDetail: false,
            coinDetailsId: "notSelected"
        }

    }
    changeView = (id, change) => {

        this.setState({ showingCoinsDetail: change })
        this.setState({ coinDetailsId: id })


    }
    componentDidMount() {
        return fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=${this.state.howManyCoins}&page=1&sparkline=false`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    howManyCoins: 10
                })
            })
            .catch((error => {
                console.log("error:" + error)
            }))


    }

    addMoreCoins() {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=${this.state.howManyCoins + 10}&page=1&sparkline=false`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    howManyCoins: this.state.howManyCoins + 10
                })
            })
            .catch((error => {
                console.log("error:" + error)
            }))

    }
    render() {

        if (this.state.isLoading == true) {
            return <Text>Coins are loading......</Text>
        }
        else if (this.state.isLoading == false && this.state.showingCoinsDetail == false) {
            let coins = this.state.dataSource.map(element => {
                return <Coin changeView={this.changeView} key={element.id} coin={element}></Coin>
            })
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ScrollView onMomentumScrollEnd={() => this.addMoreCoins()}>
                        {
                            coins
                        }
                    </ScrollView>
                </ View>
            );
        }
        else if (this.state.showingCoinsDetail == true) {
            return (
                <View >

                    <CoinDetails coinId={this.state.coinDetailsId} />
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button} onPress={() => this.changeView("notSelected", false)} >
                            <Text>Back </Text>
                        </TouchableOpacity>
                    </View>

                </ View>
            );
        }


    }
}


const styles = StyleSheet.create({
    button: {
        width: 70,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(76,175,80,0.75)',
        marginLeft: 0

    },
    buttonView:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})
