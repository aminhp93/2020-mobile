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
    Vibration,
    Modal,
    TouchableHighlight,
  } from "react-native";

export default class TaskItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSlider: false,
            setEmpty: false,
        }
    }

    handleLongPress = () => {
        
          
        this.setState({
            // showSlider: true,
            valueSlider: 0
        }, () => {
            Alert.alert(
                null,
                this.state.valueSlider,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { 
                        title: this.state.valueSlider > 10 ? 'You reach the goal' : 'Title',
                        text: 'String(this.state.valueSlider)',
                        onPress: () => {
                            this.props.handleDoneTask(this.props.data.id) 
                        }
                    },
                ],
                { cancelable: false }
            );
            this.interval = setInterval(() => {
                this.setState({
                    valueSlider: this.state.valueSlider + 1
                }, () => {
                    if (this.state.valueSlider === 10) {
                        Vibration.vibrate()
                        this.setState({
                            reachedGoal: true
                        })
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
        if (this.state.setEmpty) return null
        return (
            <Swipeout right={swipeoutBtns}>
                <TouchableOpacity
                // key={index}
                onPress={() => this.handleLongPress()}
                >
                    {
                        this.state.showSlider
                            ?  (
                                <View>
                                    <View>
                                        <Text>
                                            {this.state.valueSlider}
                                        </Text>
                                    </View>
                                    {
                                        this.state.valueSlider > 10
                                        ? <Button 
                                            title={'STOP'}
                                            onPress={() => {
                                                console.log(74)
                                                clearInterval(this.interval)
                                                this.setState({
                                                    setEmpty: true
                                                })
                                            }}/>
                                        : null
                                    }
                                    
                                </View>
                            )
                            // <Slider
                            //     style={{width: 200, height: 40}}
                            //     minimumValue={0}
                            //     maximumValue={10}
                            //     minimumTrackTintColor="#FFFFFF"
                            //     maximumTrackTintColor="#000000"
                            //     value={this.state.valueSlider}
                            // />
                            : (
                                <View style={{ flex: 1, height: 50 }}>
                                    <View>
                                    <Text>{data.title || 'Title'}</Text>
                                    </View>
                                    <View>
                                    <Text>{data.content || 'Content'}</Text>
                                    </View>
                                </View>
                            )
                    }
                    
                </TouchableOpacity>
            </Swipeout>
        )
    }
}