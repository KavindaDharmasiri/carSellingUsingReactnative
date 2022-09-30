import React, { useState } from 'react'
import { NativeBaseProvider, Text, Input, VStack, Button } from 'native-base'
import { Alert } from 'react-native';
import { useEffect } from 'react';

export default function Home({ navigation }) {
  const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [contact, setcontact] = useState('');
    const [password, setpassword] = useState('');
    const [posts, setPosts] = useState([]);


    const id = "c004"

    const saveData = () => {
        
        fetch('http://192.168.8.182:4000/users', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                name: name,
                address: address,
                contact: contact,
                password: password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {console.log("Save Saved Successfully !")})
        .catch((err)=>{console.log(err.message)})
    
    }

    return (
        <NativeBaseProvider>
            <Text fontSize="3xl" bold underline mt="10%" ml="30%">User Registeration</Text>
            <VStack space={4} alignItems="center" mt="15%">
                <Input mx="3" value={name} onChangeText={(e) => { setName(e) }} placeholder="Name" w="80%" />
                <Input mx="3" value={address} onChangeText={(e) => { setaddress(e) }} placeholder="address" w="80%" />
                <Input mx="3" value={contact} onChangeText={(e) => { setcontact(e) }} placeholder="contact No" w="80%" />
                <Input mx="3" value={password} onChangeText={(e) => { setpassword(e) }} placeholder="Password" w="80%" />
          
                <Button size="lg" w="80%" variant="subtle" colorScheme="secondary" onPress={saveData}>
                    Save User
                </Button>
                <Button size="md" variant="subtle" colorScheme="green" onPress={()=>{navigation.navigate("Car Selling - Login")}}>
                    Clik To Login
                </Button>
            </VStack>
        </NativeBaseProvider>
    )
}