import { View, Text, Pressable, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

export function Banner() {
  return (
    <View className='w-full h-36 md:h-60 rounded-2xl mt-5 mb-4 px-4'>
      <PagerView style={{ flex: 1 }} initialPage={0} pageMargin={14}>
        <Pressable className='w-full h-36 md:h-60 rounded-2xl' key="1"
        onPress={() => console.log('pressed 1')}
        >
        <Image
            source={require("../../../assets/imag6.png")}
            className='w-full h-44 md:h-60 rounded-2xl bg-bottom'
        />
        </Pressable>
        <Pressable className='w-full h-36 rounded-2xl' key="2"
        onPress={() => console.log('pressed 2')}
        >
        <Image
            source={require("../../../assets/imag6.png")}
            className='w-full h-44 md:h-60 rounded-2xl bg-bottom'
        />
        </Pressable>
      </PagerView>
    </View>
  )
}