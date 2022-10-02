import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function LoadData() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://192.168.8.182:4000/vehicle/')
            .then((response) => response.json())
            .then((json) => setPosts(json));
    })

    return (
        <View style={{padding:20}}>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{borderWidth:1, marginBottom:'5%', padding:5}} onPress={()=>{console.log("hello");}}>
                        <Text style={{marginBottom:10,fontWeight:'bold',color:"black"}} >{item.vehicleimg}</Text>
                        <Text style={{marginBottom:10,color:"black"}} >{item.vehiclename}</Text>
                        <Text style={{marginBottom:10,color:"black"}} >{item.price}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}