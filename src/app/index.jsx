import { Text, View, StatusBar, FlatList } from "react-native";
import { Header } from '../components/header';
import { Banner } from '../components/banner';
import { ShoppingCart } from '../components/ShoppingCart';
import { Footer } from '../components/footer';

export default function Index() {
  const data = [{}]; 

  return (
    <FlatList
      data={data} 
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => null}
      ListHeaderComponent={
        <View className="bg-gray-200">
          <Header />
          <Banner />
        </View>
      }
      ListFooterComponent={
        <View className="bg-gray-200">
          <ShoppingCart />
          <Footer />
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}
