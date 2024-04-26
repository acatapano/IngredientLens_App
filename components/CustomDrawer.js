import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Touchable, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../src/AuthContext";

const githubURL = 'https://github.com/acatapano/IngredientLens_App';

const CustomDrawer = (props) => {
    const {userToken} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);

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
                <TouchableOpacity onPress={()=> Linking.openURL(githubURL) } style={styles.footerButton}>
                    <View style={styles.buttonView}>
                        <Ionicons name="logo-github" size={22} />
                        <Text style={styles.buttonLabel}>Github</Text>
                    </View>
                </TouchableOpacity>
                {userToken !== null && <TouchableOpacity onPress={()=>{{logout()}}} style={styles.footerButton}>
                    <View style={styles.buttonView}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={styles.buttonLabel}>Sign Out</Text>
                    </View>
                </TouchableOpacity>}
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
        paddingBottom: 20,
        paddingLeft: 20,
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