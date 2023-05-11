import React, {useCallback, useMemo} from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  LayoutChangeEvent,
  TextInput,
  TextInputProps,
  TextProps,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {isIOS, metrics} from '../helpers/metrics';
import {colors} from '../helpers/colors';
import styled from 'styled-components/native';

const DEFAULT_STEP = 1;
const FIRST_POINT = 0;
const AnimatedText = Animated.createAnimatedComponent(TextInput);

type Size = {
  width: number;
  height: number;
};

type SliderInfo = {
  range: number;
  trackWidth: number;
};

type AnimatedGHContext = {
  startX: number;
  currentPoint: number;
};

type ThumbContainerStyle = {
  thumbSize: Size;
  hasThumbComponent?: boolean;
};

type TrackStyle = {
  backgroundColor: string;
};

type TrackPointStyle = {
  width: number;
};

interface AnimatedLabelProps extends TextInputProps {
  text: string;
}

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
type Position = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';

export type SliderProps = {
  /** The maximum value of the slider */
  maximumValue: number;

  /** The minimum value of the slider */
  minimumValue: number;

  /**
   * The step value for the slider
   * Must be an integer
   */
  step?: number;

  alwaysShowValue?: boolean;

  /** Style of the slider's track */
  trackStyle?: StyleProp<ViewStyle>;

  bgColorTrack?: string;

  bgColorTracked?: string;

  /** Style of the slider's thumb */
  thumbStyle?: StyleProp<ViewStyle>;

  bgColorLabelView?: string;

  labelStyle?: StyleProp<TextProps>;

  /** custom element that can be used to replace the default thumb of the slider */
  thumbComponent?: React.ReactElement;

  /** Whether to show the point on the slider's track */
  hasTrackPoint?: boolean;

  /** Style of the point on the slider's track */
  trackPointStyle?: StyleProp<ViewStyle>;

  /** Size of the slider's thumb */
  thumbSize?: Size;

  /** Callback function to handle the change in slider value */
  onValueChange: (value: number) => void;
};

type SliderPropsWithOptionalWidth = SliderProps & {
  sliderWidth?: number;
} & (
    | {hasTrackPoint: true; sliderWidth: number}
    | {hasTrackPoint?: false; sliderWidth?: number}
  );

const Slider: React.FunctionComponent<SliderPropsWithOptionalWidth> = ({
  minimumValue,
  maximumValue,
  step = DEFAULT_STEP,
  trackStyle,
  bgColorTrack = '#F1F1F1',
  bgColorTracked = colors.primary,
  thumbStyle,
  bgColorLabelView = colors.primary,
  alwaysShowValue,
  labelStyle,
  thumbComponent,
  hasTrackPoint,
  sliderWidth = 0,
  thumbSize = {width: metrics.medium, height: metrics.medium},
  trackPointStyle,
  onValueChange,
}) => {
  const sliderInfo = useSharedValue<SliderInfo>({range: 0, trackWidth: 0});
  const currentPoint = useSharedValue<number>(FIRST_POINT);
  const progress = useSharedValue<number>(0);
  const opacity = useSharedValue(0);

  const totalPoint = useMemo(
    () => (maximumValue - minimumValue) / step,
    [maximumValue, minimumValue, step],
  );

  const updateSlider = useCallback(
    (progressing: number, point: number) => {
      progress.value = progressing;
      currentPoint.value = point;
    },
    [currentPoint, progress],
  );

  const handler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, ctx) => {
      console.log('ccccc START');
      ctx.startX = progress.value;
    },
    onActive: (event, ctx) => {
      console.log('ccccc ACTIVE');
      const {trackWidth, range} = sliderInfo.value;
      const progressing = ctx.startX + event.translationX;
      const sliderValue = progressing / range;
      let currentProgress = 0;
      let point = 0;

      opacity.value = 1;

      if (progressing < 0) {
        runOnJS(updateSlider)(0, FIRST_POINT);
      } else if (progressing > trackWidth) {
        runOnJS(updateSlider)(trackWidth, totalPoint);
      } else if (progressing > range * (currentPoint.value + 1)) {
        currentProgress = range * Math.floor(sliderValue + 1);
        point = Math.floor(sliderValue + 1);

        runOnJS(updateSlider)(
          range * Math.floor(sliderValue),
          Math.floor(sliderValue),
        );
      } else if (progressing < range * (currentPoint.value - 1)) {
        currentProgress = range * Math.floor(sliderValue + 1);
        point = Math.floor(sliderValue + 1);

        runOnJS(updateSlider)(currentProgress, point);
      }
    },
    onEnd: () => {
      opacity.value = 0;
      runOnJS(onValueChange)(minimumValue + currentPoint.value * step);
    },
  });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{translateX: progress.value}],
  }));

  const animatedTrackStyle = useAnimatedStyle(() => ({
    width: progress.value,
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 200,
    }),
  }));

  const animatedProps = useAnimatedProps(
    () =>
      ({
        text: `${minimumValue + currentPoint.value * step}`,
      } as AnimatedLabelProps),
  );

  const getTrackWidth = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    // Range refers to the width of a point
    // It is used to calculate the correct position of the slider while sliding
    const range = width / totalPoint;
    sliderInfo.value = {range: range, trackWidth: width};
  };

  const TrackPointComponent = useMemo(() => {
    const tmpRange = sliderWidth / totalPoint - 1;

    // Render the track points based on the range
    return (
      <TrackPoint width={sliderWidth}>
        {/**
         * Loop through the range of the slider track and render a point for each value
         * The value is calculated by subtracting the minimum value from the maximum value and subtracting 1 for the initial position
         */}
        {Array(totalPoint - 1)
          .fill(0)
          .map((_, i) => (
            <Point
              testID="slider-point"
              key={i}
              style={[trackPointStyle, {left: tmpRange * (i + 1)}]}
            />
          ))}
      </TrackPoint>
    );
  }, [sliderWidth, totalPoint, trackPointStyle]);

  return (
    // <GestureHandlerRootView style={{flex: 1, backgroundColor: 'pink'}}>
    <Container>
      <Track
        backgroundColor={bgColorTrack}
        style={[
          trackStyle,
          (hasTrackPoint || !!sliderWidth) && {width: sliderWidth},
        ]}
        onLayout={getTrackWidth}
      />
      {!!hasTrackPoint && TrackPointComponent}
      <Tracked
        backgroundColor={bgColorTracked}
        style={[
          trackStyle,
          hasTrackPoint && {width: sliderWidth},
          animatedTrackStyle,
        ]}
      />
      <PanGestureHandler
        onGestureEvent={handler}
        hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
        <Thumb
          thumbSize={thumbSize}
          hasThumbComponent={!!thumbComponent}
          style={[
            thumbStyle,
            {left: -thumbSize.width / 2},
            animatedThumbStyle,
          ]}>
          <LabelContainer
            style={[
              {backgroundColor: bgColorLabelView},
              !alwaysShowValue && opacityStyle,
            ]}
            thumbSize={thumbSize}>
            <TriangleDown
              style={[
                {
                  borderBottomColor: bgColorLabelView,
                  transform: [{rotate: '180deg'}],
                },
              ]}
            />
            <Label
              {...{animatedProps}}
              style={labelStyle}
              editable={false}
              defaultValue={minimumValue?.toString()}
            />
          </LabelContainer>
          {thumbComponent}
        </Thumb>
      </PanGestureHandler>
    </Container>
    // </GestureHandlerRootView>
  );
};

const Container = styled.View({
  justifyContent: 'center',
});

const Track = styled(Animated.View)((props: TrackStyle) => ({
  height: 10,
  borderRadius: 10,
  // backgroundColor: props.backgroundColor,
  backgroundColor: 'transparent',
}));

const TrackPoint = styled.View((props: TrackPointStyle) => ({
  width: props.width,
  flexDirection: 'row' as FlexDirection,
  height: '100%',
  position: 'absolute' as Position,
  overflow: 'hidden',
}));

const Point = styled.View({
  height: '100%',
  width: 1,
  backgroundColor: colors.primary,
});

const Thumb = styled(Animated.View)((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  height: props.thumbSize.height,
  width: props.thumbSize.width,
  borderRadius: 10,
  borderWidth: props.hasThumbComponent ? 0 : 1,
  backgroundColor: props.hasThumbComponent ? 'transparent' : colors.white,
}));

const Tracked = styled(Animated.View)((props: TrackStyle) => ({
  ...StyleSheet.absoluteFillObject,
  height: 10,
  borderRadius: 10,
  backgroundColor: props.backgroundColor,
}));

const TriangleDown = styled.View({
  position: 'absolute',
  bottom: -5,
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 5,
  borderRightWidth: 5,
  borderBottomWidth: 10,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
});

const LabelContainer = styled(Animated.View)((props: ThumbContainerStyle) => ({
  position: 'absolute' as Position,
  top: -40,
  bottom: props.thumbSize.height + metrics.xxs,
  borderRadius: 5,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Label = styled(AnimatedText)({
  color: colors.white,
  padding: isIOS ? 5 : 2,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 16,
  width: '100%',
});

export default Slider;
