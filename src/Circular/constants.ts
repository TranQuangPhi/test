import type Animated from 'react-native-reanimated';
import {Easing as _Easing} from 'react-native-reanimated';
import type {ScaledSize} from 'react-native';
import {Dimensions} from 'react-native';

export enum DATA_LENGTH {
  SINGLE_ITEM = 1,
  DOUBLE_ITEM = 2,
}

export const Easing = {
  easeOutQuart: _Easing.bezier(
    0.25,
    1,
    0.5,
    1,
  ) as unknown as Animated.EasingFunction,
};

export const ElementsText = {
  AUTOPLAY: 'AutoPlay',
};

export const window: ScaledSize = Dimensions.get('window');
