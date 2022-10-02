import React, { useState } from 'react'
import { NativeBaseProvider, Text, Input, VStack, Button, Avatar } from 'native-base'
import { Alert,Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const options ={
    title: 'Select Image',
    type: 'library',
    options: {
        maxHeight:200,
        maxWidth:200,
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
    
    },
}

export default function AddData({navigation}) {
    const [pic,setPic] = React.useState('');


    const openGallery=async()=>{

        const images = await launchImageLibrary(options);

        console.log(images.assets[0].uri)
        console.log(images.assets[0].type)
        console.log(images.assets[0].fileName)
        
        const formdata = new FormData()
        formdata.append('file',{
            uri:images.assets[0].uri,
            type:images.assets[0].type,
            name:images.assets[0].fileName
        })

        let res = await fetch('http://192.168.8.182:4000/vehicle/image',{
            method:'post',
            body:formdata,
            headers:{
                'Content-type': 'multipart/form-data',
            },
        });

        let responsejson =await res.json();
        setPic(responsejson.name);

    }

    const [vehiclename, setvehiclename] = useState('');
    const [vehicleimg, setvehicleimg] = useState('');
    const [price, setprice] = useState('');

    var code = "C001"

    const saveData = () => {
        console.log(code)
        console.log(vehiclename)
        console.log(pic)
        console.log(price)

        fetch('http://192.168.8.182:4000/vehicle/', {
            method: 'POST',
            body: JSON.stringify({
                code: code,
                vehiclename: vehiclename,
                vehicleimg: pic,
                price: price
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


            <Image source = {require('../assests/2a32feb3-8f97-4044-a92a-edd3b13048a0.png')} />

            <Button size="md" w="80%" variant="subtle" colorScheme="green" onPress={openGallery}>
                    upload
                </Button>
                
                
                <Input mx="3" value={vehicleimg} onChangeText={(e) => { setvehicleimg(e) }} placeholder="vehicle image" w="80%" />
                <Input mx="3" value={vehiclename} onChangeText={(e) => { setvehiclename(e) }} placeholder="vehicle name" w="80%" />
                <Input mx="3" value={price} onChangeText={(e) => { setprice(e) }} placeholder="Price" w="80%" />
                
                <Button size="md" w="80%" variant="subtle" colorScheme="secondary" onPress={saveData}>
                    save Car
                </Button>
                <Button size="md" w="80%" variant="subtle" colorScheme="green" onPress={()=>{navigation.navigate("Car Selling - LoadData")}}>
                    view cars
                </Button>
            </VStack>
        </NativeBaseProvider>
    )
}