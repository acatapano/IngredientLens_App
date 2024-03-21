import { StyleSheet, Image, Dimensions } from 'react-native';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: imageWidth,
    height: 440,
    borderRadius: 18,
  },
});
