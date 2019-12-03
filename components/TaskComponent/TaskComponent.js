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
      ],
      num: 0,
      selected: [],
      listImages: []
    };
  }

  openPhotos = () => {
    // ImagePicker.openPicker({
    //   multiple: true
    // }).then(images => {
    //   console.log(images);
    // });
    // <CameraRollPicker callback={this.getSelectedImages} />;
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

  componentDidMount() {
    this.getPermissionAsync();
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

  render() {
    const swipeoutBtns = [
      {
        text: "Button"
      }
    ];

    const { listTasks, image, listImages } = this.state;
    return (
      <ScrollView>
        {listImages.map(item => {
          console.log(item);
          return (
            <Image
              source={{ uri: item.uri }}
              style={{ width: 200, height: 200 }}
            />
          );
        })}
      </ScrollView>
      // <ScrollView style={{ marginTop: 30, width: "100%" }}>
      //   {listTasks.map((item, index) => {
      //     return (
      //       <Swipeout right={swipeoutBtns}>
      //         <TouchableOpacity
      //           key={index}
      //           onPress={() => this.handleLongPress()}
      //         >
      //           <View key={index} style={{ flex: 1, height: 50 }}>
      //             <View>
      //               <Text>{item.title}</Text>
      //             </View>
      //             <View>
      //               <Text>{item.content}</Text>
      //             </View>
      //           </View>
      //         </TouchableOpacity>
      //       </Swipeout>
      //     );
      //   })}
      //   <TouchableOpacity onPress={() => this.openPhotos()}>
      //     <Text>Open photos</Text>
      //   </TouchableOpacity>
      // </ScrollView>
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
