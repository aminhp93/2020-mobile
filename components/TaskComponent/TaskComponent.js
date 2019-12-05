import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS,
  Button,
  Image
} from "react-native";
import Swipeout from "react-native-swipeout";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import TaskItemComponent from "./TaskItemComponent";

export default class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTasks: [
        {
          id: 1,
          title: "Task 1",
          content: "App Crud Feature"
        },
        {
          id: 2,
          title: "Task 2",
          content: "Set timer and alert for each task"
        }
      ],
      num: 0,
      selected: [],
      listImages: []
    };
  }

  openPhotos = () => {
    const options = {
      first: 5
    };
    MediaLibrary.getAssetsAsync(options).then(response => {
      this.setState({
        listImages: response.assets
      });
      console.log(response);
    });

    console.log("hi");
  };

  getSelectedImages = (images, current) => {
    var num = images.length;

    this.setState({
      num: num,
      selected: images
    });

    console.log(current);
    console.log(this.state.selected);
  };

  handleLongPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Start"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          // start
          this.setState({
            showSlider: true,
          })

        }
      }
    );
  };

  componentDidMount() {
    this.getPermissionAsync();
    
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  handleDoneTask = (id) => {
    const index = this.state.listTasks.findIndex(item => item.id === id);
    this.setState({
      listTasks: this.state.listTasks.splice(index, 1)
    })
  }

  render() {
  
    const { listTasks, image, listImages } = this.state;
    return (
      // <ScrollView>
      //   {listImages.map(item => {
      //     console.log(item);
      //     return (
      //       <Image
      //         source={{ uri: item.uri }}
      //         style={{ width: 200, height: 200 }}
      //       />
      //     );
      //   })}
      // </ScrollView>
      <ScrollView style={{ marginTop: 30, width: "100%" }}>
        {listTasks.map((item, index) => {
          return (
            <TaskItemComponent data={item} handleDoneTask={this.handleDoneTask}/>
          );
        })}
        <TouchableOpacity onPress={() => this.openPhotos()}>
          <Text>Open photos</Text>
        </TouchableOpacity>
      </ScrollView>
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      //   <Button
      //     title="Pick an image from camera roll"
      //     onPress={this._pickImage}
      //   />
      //   {image && (
      //     <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      //   )}
      // </View>
    );
  }
}
