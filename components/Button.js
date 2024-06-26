import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker';

const dimensions = Dimensions.get('window');
const buttonWidth = dimensions.width;

export default function Button({ label, theme, onPress }) {
    
    if (theme === "primary") {
        return (
          <View style={[styles.buttonContainer]}>
            <Pressable
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={onPress}
            >
              <FontAwesome
                name="picture-o"
                size={18}
                color="#25292e"
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </Pressable>
          </View>
        );
      }

    if (theme === "secondary") {
        return (
          <View style={[styles.buttonContainer]}>
            <Pressable
              style={[styles.button, { backgroundColor: "#17f502" }]}
              onPress={onPress}
            >
              <FontAwesome
                name="check"
                size={18}
                color="#25292e"
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </Pressable>
          </View>
        );
      }

      if (theme === "third") {
        return (
          <View style={[styles.buttonContainer]}>
            <Pressable
              style={[styles.button, { backgroundColor: "#f14249" }]}
              onPress={onPress}
            >
              <FontAwesome
                name="rotate-right"
                size={18}
                color="#000"
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonLabel, { color: "#000" }]}>{label}</Text>
            </Pressable>
          </View>
        );
      }
    
    return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => ImagePicker.launchCameraAsync()}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
    );

}

const styles = StyleSheet.create({
  buttonContainer: {
    width: buttonWidth,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
