import React from 'react';
import {
  StyleSheet, View, TouchableOpacity,Text
} from 'react-native';


export default  class MainScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const listOfCharts = [
            'TimeSeries', 'LineChart', 'AreaChart'
        ]
        return(
            <View style={styles.container}>
                {listOfCharts.map((item, key) => (
                    <TouchableOpacity  style={styles.buttonTextContainer} 
                                        key={key}
                                    onPress={() => {this.props.navigation.navigate(item)}}>
                                        
                        <Text style={styles.buttonText}> {` Navigate to ${item}`} </Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTextContainer: {
        borderWidth:2,
        margin: 5,
        padding: 10,
        backgroundColor:'#74B9FF',
        borderRadius:15,
        borderColor:'white'
    },
    buttonText: {
        color:'white',
        fontWeight:'500'
    }
})