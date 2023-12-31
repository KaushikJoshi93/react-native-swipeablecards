import React , { useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue , useAnimatedReaction } from 'react-native-reanimated';


const Card = (props) => {
  const position = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const [displayValue, setDisplayValue] = useState("block");
  const [showIcon, setShowIcon] = useState(false);
  const [iconName, setIconName] = useState("check-circle");
  const pan = Gesture.Pan().onChange((e) => {
    console.log("panning....", rotateX.value)

    if (e.velocityX > 0) {
      console.log('Swiping left to right');
      let val = rotateX.value;
      if(val < 12){
        position.value += 45;
        rotateX.value += position.value / 45;
      }

    } else if (e.velocityX < 0) {
      console.log('Swiping right to left');
      let val = rotateX.value;
      if(val > -30){
        position.value -= 5;
        rotateX.value -= position.value / 10;
        rotateX.value = -(rotateX.value)
      }

    }

  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }, { rotate: `${rotateX.value}deg` }]
    }
  }) 


  useEffect(()=>{
    console.log("running....")
    let intervalId;
    // setinteval function will stop when the icon is shown on the card 
    if(showIcon == false){
       intervalId = setInterval(() => {
        console.log('Running every second...');
        let val = rotateX.value;
    
        if (val > 12) {
          console.log('Right Over...');
          setShowIcon(true);
          setTimeout(() => {
            setDisplayValue('none');
          },550);
        }
    
        if (val < 0) {
          console.log('Left Over...');
          setShowIcon(true);
          setIconName('close-circle');
          setTimeout(() => {
            setDisplayValue('none');
          },550);
        }
      }, 1000);
    }

    return ()=>{
     intervalId && clearInterval(intervalId);
    }
  },[rotateX.value])


  

  return (
    <>
      {(displayValue !== "none") ? <GestureDetector gesture={pan} >
        <Animated.View className={`w-9/12 h-2/3 rounded-lg  absolute self-center flex flex-row`} style={[animatedStyle , {display: displayValue,bottom:props.bottom,backgroundColor:`${props.color}`  , width:`${90 - props.index*5}%`}]}>
          {
            showIcon &&
            <IconButton icon={iconName} size={80} color={iconName == "check-circle" ? "green" : "red"} style={{marginLeft:`${iconName == "close-circle" ? "auto":null}` , marginRight:`${iconName == "check-circle" ? "auto":null}`}}/>
          }
        </Animated.View>
      </GestureDetector> : null}
    </>

  )
}

export default Card