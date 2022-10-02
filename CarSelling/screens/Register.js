import React, { useState } from 'react'
import { NativeBaseProvider, Text, Input, VStack, Button } from 'native-base'
import { Alert } from 'react-native';
import { useEffect } from 'react';
import { panGestureHandlerCustomNativeProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
    const [address, setaddress] = useState('');
    const [contact, setcontact] = useState('');
    const [password, setpassword] = useState('');
    const [posts, setPosts] = useState([]);


    var id = "U006"

    useEffect(() => {
        getUsers()
    })

    const getUsers = () => {
        fetch('http://192.168.8.182:4000/users/')
        .then((response) => response.json())
        .then((json) => setPosts(json));
    }

    const saveData = () => {
        
        fetch('http://192.168.8.182:4000/users/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: "U001",
                name: name,
                address: address,
                contact: contact,
                password: password,
            }),
        }).then((response) => {console.log("Save Saved Successfully !"); clearFields()})
        .catch((err)=>{console.log(err.message);clearFields()});
        
    }

    const setId = () => {
      
        getUsers()

        var id2=posts[posts.length-1].id; 

        
        let temp = parseInt(id2.slice(1))
        
        
        if (temp < 1) {
            id = 'U001'
        } else if (temp < 9) {
            id = 'U00' + (temp + 1)
        } else if (temp < 99) {
            id = 'U0' + (temp + 1)
        } else if (temp < 999) {
            id = 'U' + (temp + 1)
        } else {
            id = 'U001'
        }
        console.log(id)
    }

    const clearFields = () => {
        setName(""),
        setaddress(""),
        setcontact(""),
        setpassword("")
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