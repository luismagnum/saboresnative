import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa los íconos necesarios

export function Footer() {
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'No se pudo abrir el enlace')
    );
  };

  return (
    <View className="bg-gray-800 p-4 pb-10">
      <Text className="text-center text-white text-lg font-bold">
        Sabores de Venezuela
      </Text>

      <View className="flex-row justify-center mt-4 space-x-4">
        {/* Botón de Facebook */}
        <TouchableOpacity
          className="flex-row items-center bg-blue-600 py-2 px-4 rounded"
          onPress={() =>
            handleOpenLink(
              'https://www.facebook.com/profile.php?id=100063541335021'
            )
          }
        >
          <Icon name="facebook" size={20} color="white" className="mr-2" />
          <Text className="text-white font-semibold">Facebook</Text>
        </TouchableOpacity>

        {/* Botón de Instagram */}
        <TouchableOpacity
          className="flex-row items-center bg-pink-500 py-2 px-4 rounded"
          onPress={() =>
            handleOpenLink(
              'https://www.instagram.com/saboresdevenezuela2020?igshid=NjlwNzlyMDk2Mg=='
            )
          }
        >
          <Icon name="instagram" size={20} color="white" className="mr-2" />
          <Text className="text-white font-semibold">Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
