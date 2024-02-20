import { Text, SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        About Us
      </Text>
      <Text style={styles.baseText}>
        Learn more about our company, our team, and our mission.
      </Text>

      <Text style={styles.baseText}></Text>

      <Text style={styles.titleText}>
        Meet the Team
      </Text>
      <Text style={styles.baseText}>
        Jack Berkowitz - Front end
      </Text>
      <Text style={styles.baseText}>
        John Costa - Front end
      </Text>
      <Text style={styles.baseText}>
        Dima Bezborodov - AWS developer
      </Text>
      <Text style={styles.baseText}>
        Andrew Catapano - Back end
      </Text>

      <Text style={styles.baseText}></Text>

      <Text style={styles.titleText}>
        Our Mission
      </Text>
      <Text style={styles.baseText}>
        Our mission is to provide high-quality products and services to our customers. We are committed to continuous improvement and strive to exceed our customers' expectations.
      </Text>

      <Text style={styles.baseText}></Text>

      <Text style={styles.baseText}>
        Monmouth University
      </Text>
      <Text style={styles.baseText}>
        Fall 2023 - Spring 2024
      </Text>
    </SafeAreaView>
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
});
