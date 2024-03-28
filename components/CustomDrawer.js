import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Touchable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView 
            {...props}
            contentContainerStyle={styles.scrollv}>
                <View style={styles.list}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={styles.drawerFooter}>
                <TouchableOpacity onPress={()=>{}} style={styles.footerButton}>
                    <View style={styles.buttonView}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text style={styles.buttonLabel}>Tell a Friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}} style={styles.footerButton}>
                    <View style={styles.buttonView}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={styles.buttonLabel}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View> 

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#25292e'
    },
    scrollv: {
        backgroundColor: 'green'
    },
    list: {
        flex: 1,
        backgroundColor:'white',
        paddingTop: 10
    },
    drawerFooter: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    footerButton: {
        paddingVertical: 15
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonLabel: {
        fontSize: 15,
        marginLeft: 5
    }
});

export default CustomDrawer