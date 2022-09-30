import React, { useState } from 'react'
import { NativeBaseProvider, Text, Input, VStack, Button } from 'native-base'
import { Alert } from 'react-native';
import { useEffect } from 'react';

export default function Login({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    saveData()
})

const saveData = async() => {
    await fetch('https://8a85-2402-4000-21c1-874a-e984-b332-2182-d1ea.in.ngrok.io/users')
        .then((response) => response.json())
        .then((json) => console.log(json));
}

  return (
    <NativeBaseProvider>
        <Text fontSize="3xl" bold underline mt="10%" ml="30%">User Login</Text>
        <VStack space={4} alignItems="center" mt="15%">
            <Input mx="3" value={title} onChangeText={(e) => { setTitle(e) }} placeholder="Name" w="80%" />
            <Input mx="3" value={body} onChangeText={(e) => { setBody(e) }} placeholder="Password" w="80%" />
      
            <Button size="lg" w="80%" variant="subtle" colorScheme="secondary" onPress={saveData}>
                Log
            </Button>
            <Button size="md" variant="subtle" colorScheme="green" onPress={()=>{navigation.navigate("Car Selling - AddData")}}>
                Clik To loaddata
            </Button>
        </VStack>
    </NativeBaseProvider>
)
}
