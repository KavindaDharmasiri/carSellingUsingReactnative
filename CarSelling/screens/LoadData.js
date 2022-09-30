import { View, Text, FlatList,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function LoadData() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((json) => setPosts(json));
    })

    return (
        <View style={{padding:20}}>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <TouchableOpacity style={{borderWidth:1, marginBottom:'5%', padding:5}} onPress={()=>{console.log("hello");}}>
                        <Text style={{marginBottom:10,fontWeight:'bold'}} >{item.title}</Text>
                        <Text style={{marginBottom:10}} >{item.body}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}