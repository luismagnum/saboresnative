import { View,Pressable, Text } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export function Header(){
    return (
        <View className="w-full flex flex-row items-center justify-between p-2">
            <Pressable className="mt-10 w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <Ionicons name="menu" size={20} color="black" />
            </Pressable>
            <View className="flex flex-col items-center justify-center">
                <Text className="text-center text-2xl text-slate-800 font-bold">Sabores de Venezuela</Text>
                <Text className="text-center text-xl text-slate-800 font-bold">Comida tipica venezolana</Text>
                 <View className="flex-row items-center justify-center gap-1">
                <Feather name="map-pin" size={14} color="#ff0000"/>
                <Text className="text-lg font-bold">Villa regina</Text>
                 </View>
            </View>

            <Pressable className="mt-10 w-10 h-10 bg-white rounded-full flex justify-center items-center">
                <Feather name="bell" size={20} color="black" />
            </Pressable>
        </View>
    )
}