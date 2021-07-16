

import { Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
const base_width = 411.42857142857144;
const base_height = 774.8571428571429;
export const HEIGHT = (data) => {
    var answer = (height * data) / base_height;
    return answer;
}
export const WIDTH = (data) => {
    var answer = (width * data) / base_width;
    return answer;
}