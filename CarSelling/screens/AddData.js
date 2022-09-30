import React, { useState } from 'react'
import { NativeBaseProvider, Text, Input, VStack, Button } from 'native-base'
import { Alert } from 'react-native';

export default function AddData({navigation}) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [id, setId] = useState('');

    const saveData = () => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
                userId: id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {Alert.alert("Save Saved Successfully !")})
            .catch((err)=>{Alert.alert("Error occured !")})
    }

    return (
        <NativeBaseProvider>
            <Text fontSize="3xl" bold underline mt="10%" ml="30%">Save Car</Text>
            <VStack space={4} alignItems="center" mt="15%">
                <Input mx="3" value={title} onChangeText={(e) => { setTitle(e) }} placeholder="Car Brand" w="80%" />
                <Input mx="3" value={id} onChangeText={(e) => { setId(e) }} placeholder="Transmission type" w="80%" />
                <Input mx="3" value={body} onChangeText={(e) => { setBody(e) }} placeholder="Price" w="80%" />
                
                <Button size="md" w="80%" variant="subtle" colorScheme="secondary" onPress={saveData}>
                    Upload Image
                </Button>
                <Button size="md" w="80%" variant="subtle" colorScheme="green" onPress={()=>{navigation.navigate("LoadData")}}>
                    Save Car
                </Button>
            </VStack>
        </NativeBaseProvider>
    )
}