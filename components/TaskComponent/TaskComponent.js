import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS
} from "react-native";
import Swipeout from "react-native-swipeout";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTasks: [
        {
          title: "Task 1",
          content: "App Crud Feature"
        },
        {
          title: "Task 2",
          content: "Set timer and alert for each task"
        }
      ]
    };
  }

  handleLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Remove"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          /* destructive action */
        }
      }
    );
  };

  componentDidMount() {}

  render() {
    const swipeoutBtns = [
      {
        text: "Button"
      }
    ];

    const { listTasks } = this.state;
    return (
      <ScrollView style={{ marginTop: 30, width: "100%" }}>
        {listTasks.map((item, index) => {
          return (
            <Swipeout right={swipeoutBtns}>
              <TouchableOpacity
                key={index}
                onPress={() => this.handleLongPress()}
              >
                <View key={index} style={{ flex: 1, height: 50 }}>
                  <View>
                    <Text>{item.title}</Text>
                  </View>
                  <View>
                    <Text>{item.content}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeout>
          );
        })}
      </ScrollView>
    );
  }
}
