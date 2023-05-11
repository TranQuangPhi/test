import React from 'react';
import {View} from 'react-native';
// import 'react-native-gesture-handler';
// import Index from './src/Circular';
// import Slider from './src/components/Slider/Slider';
// import RNConfig from 'react-native-config';
// import {RnBaseButton} from 'rn-base-component';

function App(): JSX.Element {
  // const [value, setValue] = useState<number>(20);
  // const [value1, setValue1] = useState<number>(5);
  // const [value2, setValue2] = useState<number>(0);
  // const [value3, setValue3] = useState<number>(0);
  // const [value4, setValue4] = useState<number>(0);
  // const [value5, setValue5] = useState<number>(1);
  // const [rangeValue, setRangeValue] = useState<{
  //   minimum: number;
  //   maximum: number;
  // }>({minimum: 20, maximum: 40});
  // const [rangeValue1, setRangeValue1] = useState<{
  //   minimum: number;
  //   maximum: number;
  // }>({
  //   minimum: 10,
  //   maximum: 40,
  // });

  // const theme = extendTheme({
  //   colors: {
  //     primary: '#7239E5',
  //     secondary: '#FFBB33',
  //     backgroundPrimary: '#F5F2F1',
  //     backgroundSecondary: '#D1D1D1',
  //     mainBackground: '#F0F2F3',
  //     backgroundColor: '#FFFFFF',
  //     cardPrimaryBackground: 'green',
  //     textColor: '#0B0B0B',
  //     textLightColor: '#FFFFFF',
  //   },
  //   darkColors: {
  //     primary: '#11EFE8',
  //     secondary: '#DADD12',
  //     backgroundPrimary: '#F1F1F1',
  //     backgroundSecondary: '#6610BC',
  //     mainBackground: '#F0F2F3',
  //     backgroundColor: '#5F6066',
  //     cardPrimaryBackground: 'gray',
  //     textColor: '#0B0B0B',
  //     textLightColor: '#333333',
  //   },
  // });
  console.log('ccccc 8');

  return (
    <View />
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>{RNConfig.APP_ENV}</Text>
    // </View>
    // <Index />
    // <BaseProvider theme={theme}>
    //   <GestureHandlerRootView style={{flex: 1}}>
    //     <ScrollView contentContainerStyle={{flex: 1}}>
    //       <View style={styles.container}>
    //         {/* <RnBaseButton /> */}
    //         <View style={styles.spacingTop} />
    //         <Slider />
    //         <View style={styles.spacingTop} />
    //         <Slider
    //           minimumValue={4}
    //           step={2}
    //           maximumValue={20}
    //           alwaysShowValue
    //           showTrackPoint
    //           tapToSeek
    //           roundToValue={1}
    //           sliderWidth={331}
    //         />
    //         <View style={styles.spacingTop} />
    //         <Slider
    //           minimumValue={4}
    //           maximumValue={20}
    //           alwaysShowValue
    //           showTrackPoint
    //           tapToSeek
    //           sliderWidth={331}
    //         />
    //         <View style={styles.spacingTop} />
    //         <Slider.Range
    //           minimumValue={4}
    //           // step={4}
    //           maximumValue={20}
    //           style={styles.height10}
    //           tapToSeek
    //           roundToValue={1}
    //           alwaysShowValue
    //           thumbSize={{height: 40, width: 40}}
    //           showTrackPoint
    //           sliderWidth={351}
    //         />
    //         <View style={styles.spacingTop} />
    //         <Slider.Range
    //           minimumValue={4}
    //           step={2}
    //           maximumValue={20}
    //           style={styles.height10}
    //           tapToSeek
    //           roundToValue={1}
    //           alwaysShowValue
    //           thumbSize={{height: 40, width: 40}}
    //           showTrackPoint
    //           sliderWidth={351}
    //         />
    //         <View style={styles.spacingTop} />
    //         <Slider.Range
    //           minimumValue={4}
    //           maximumValue={20}
    //           style={styles.height10}
    //           tapToSeek
    //           alwaysShowValue
    //           thumbSize={{height: 40, width: 40}}
    //           showTrackPoint
    //           sliderWidth={351}
    //         />
    //       </View>
    //     </ScrollView>
    //   </GestureHandlerRootView>
    // </BaseProvider>
  );
}

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//     paddingBottom: 40,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     marginHorizontal: metrics.medium,
//   },
//   thumb: {
//     height: 50,
//     width: 50,
//   },
//   bgColorThumb: {
//     backgroundColor: 'pink',
//     borderColor: 'yellow',
//   },
//   spacingTop: {
//     marginTop: 70,
//   },
//   spacingTop20: {
//     marginTop: 20,
//   },
//   height30: {
//     height: 30,
//   },
//   height10: {
//     height: 10,
//   },
//   radius: {
//     borderRadius: 10,
//   },
//   black: {
//     color: 'black',
//   },
// });

export default App;
