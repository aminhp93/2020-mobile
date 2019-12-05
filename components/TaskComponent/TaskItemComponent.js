import React from 'react';
// import Slider from '@react-native-community/slider';
import Swipeout from "react-native-swipeout";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ActionSheetIOS,
    Button,
    Image,
    Slider,
    Alert,
  } from "react-native";

export default class TaskItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlider: false,
        }
    }

    handleLongPress = () => {
        this.setState({
            showSlider: true,
            valueSlider: 0
        }, () => {
            setInterval(() => {
                this.setState({
                    valueSlider: this.state.valueSlider + 1
                }, () => {
                    if (this.state.valueSlider === 10) {
                        Alert.alert(
                            null,
                            null,
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              { text: 'You reached the goal', onPress: () => this.props.handleDoneTask(this.props.id) },
                            ],
                            { cancelable: false }
                          );
                          
                    }
                })
            }, 1000)
        })
    }

    render() {
        const {data} = this.props;
        const swipeoutBtns = [
            {
              text: "Button"
            }
          ];
        return (
            <Swipeout right={swipeoutBtns}>
                <TouchableOpacity
                // key={index}
                onPress={() => this.handleLongPress()}
                >
                    {
                        this.state.showSlider
                            ?   <Slider
                                style={{width: 200, height: 40}}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                                value={this.state.valueSlider}
                            />
                            : (
                                <View style={{ flex: 1, height: 50 }}>
                        <View>
                        <Text>{data.title}</Text>
                        </View>
                        <View>
                        <Text>{data.content}</Text>
                        </View>
                    </View>
                            )
                    }
                    
                </TouchableOpacity>
            </Swipeout>
        )
    }
}