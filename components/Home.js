import { View } from "react-native"
import { Text } from "react-native-paper"
import Card from "./Card"
import { GestureHandlerRootView } from "react-native-gesture-handler"


const Home = () => {
  const arr = Array.from({length:5} , (_ , index)=>(index*10)+150);
  console.log(arr , "array")
  const colorArr = ["#FF9671" , "#D65DB1" , "#B39CD0" , "#F3C5FF" , "#4FFBDF"]
  return (
          <GestureHandlerRootView>
                <View className="relative bg-white w-full h-full flex justify-center items-center">
                  
                    {
                      arr.map((val , index)=>(
                          <Card key={index} bottom={val} color={colorArr[index]} index={arr.length - index}/>
                          ))
                    }
                </View>
          </GestureHandlerRootView>
  )
}

export default Home