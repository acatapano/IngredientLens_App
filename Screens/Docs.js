import React from 'react';
import { Image, Linking, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function Docs() {
    return (
        <div>
            <Text>
                This is the Docs page.
            </Text>

            <TouchableHighlight onPress={() => navigation.navigate("Docs")}>
                <View style={styles.button}>
                    <Image
                        style={styles.imageLogo}
                        source={require('../assets/logo_green.png')}
                    />
                </View>
            </TouchableHighlight>
        </div>
    );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: 'black',
    },
    titleText: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 24,
      paddingBottom: 10,
    },
    baseText: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
      paddingBottom: 10,
    },
    cookText: {
      paddingBottom: 20,
      color: 'white',
      fontSize: 14,
    },
    greenText: {
      color: '#229A32',
    },
    button: {
      marginBottom: 20,
      width: 260,
      height: 60,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: 'green',
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white',
    },
    imageLogo: {
      width: 100,
      height: 100,
    },
});
  