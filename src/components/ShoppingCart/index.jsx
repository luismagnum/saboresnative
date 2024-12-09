import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Linking,
} from 'react-native';

// Importa las imágenes locales
const productImages = {
  product1: require('./../../../assets/images/imag2.png'),
  product2: require('./../../../assets/images/imag2.png'),
  product3: require('./../../../assets/images/imag2.png'),
  product4: require('./../../../assets/images/imag2.png'),
  product5: require('./../../../assets/images/imag2.png'),
};

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animación de opacidad

  const products = [
    { id: '1', name: 'Empanadas', price: 15000, image: productImages.product1 },
    { id: '2', name: 'Tequeños', price: 11000, image: productImages.product2 },
    { id: '3', name: 'Combo 1', price: 20500, image: productImages.product3 },
    { id: '4', name: 'Combo 2', price: 14000, image: productImages.product3 },
    { id: '5', name: 'Combo 3', price: 12000, image: productImages.product3 },
  ];

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Función para mostrar y ocultar el mensaje de error
  const showErrorMessage = () => {
    setErrorMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1, // Mostrar mensaje
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Ocultar mensaje
        duration: 300,
        useNativeDriver: true,
      }).start(() => setErrorMessage(false)); // Al finalizar la animación, ocultar el estado
    }, 3000);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showErrorMessage(); // Mostrar mensaje si el carrito está vacío
    } else {
      const message = cartItems
        .map(
          (item) =>
            `${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
        )
        .join('\n');
      const totalMessage = `Total: $${total.toFixed(2)}`;
      const finalMessage = `Hola, me gustaría realizar el siguiente pedido:\n\n${message}\n\n${totalMessage}`;

      const whatsappUrl = `https://wa.me/5492984417477?text=${encodeURIComponent(finalMessage)}`;

      Linking.openURL(whatsappUrl).catch(() =>
        Alert.alert('Error', 'No se pudo abrir WhatsApp')
      );
    }
  };

  const renderHeader = () => (
    <View className='mx-4'>
      <Text className="text-2xl font-bold mb-4">Tienda</Text>
      <Text className="text-xl font-bold mb-2">Productos disponibles:</Text>
    </View>
  );

  const renderProducts = () => (
    <View>
      {products.map((product) => (
        <View
          key={product.id}
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <Image source={product.image} className="w-16 h-16 rounded" />
          <View className="flex-1 ml-4">
            <Text className="text-lg font-semibold">{product.name}</Text>
            <Text className="text-gray-600">${product.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleAddToCart(product)}
            className="bg-green-500 p-2 rounded"
          >
            <Text className="text-white">Agregar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderCart = () => (
    <View>
      <Text className="text-xl font-bold ml-4 mt-4">Carrito de Compras:</Text>
      {cartItems.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center justify-between p-4 border-b border-gray-200"
        >
          <Image source={item.image} className="w-16 h-16 rounded" />
          <View className="flex-1 ml-4">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-600">
              ${item.price.toFixed(2)} x {item.quantity} = $
              {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleRemoveItem(item.id)}
            className="bg-red-500 p-2 rounded"
          >
            <Text className="text-white">Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      {cartItems.length === 0 && (
        <Text className="text-center text-gray-600">El carrito está vacío.</Text>
      )}
    </View>
  );

  const renderFooter = () => (
    <View className="p-4 border-t border-gray-200 mt-4">
      <Text className="text-xl font-semibold">Total: ${total.toFixed(2)}</Text>
      <TouchableOpacity onPress={handleCheckout} className="bg-blue-500 p-4 rounded mt-2">
        <Text className="text-white text-center font-semibold">Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        data={['header']} // Truco para usar FlatList como contenedor general
        renderItem={() => (
          <View>
            {renderHeader()}
            {renderProducts()}
            {renderCart()}
            {renderFooter()}
          </View>
        )}
        keyExtractor={(item) => item}
      />
      {/* Mensaje de error */}
      {errorMessage && (
        <Animated.View
          style={[
            { opacity: fadeAnim },
            {
              position: 'absolute',
              bottom: 20,
              left: 20,
              right: 20,
              padding: 10,
              backgroundColor: 'red',
              borderRadius: 10,
            },
          ]}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            No puedes finalizar la compra con el carrito vacío.
          </Text>
        </Animated.View>
      )}
    </View>
  );
}


