import React, { useContext } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useState, ChangeEvent, useEffect } from "react";
import { callPostGatewayApi } from "../src/request";
import { AuthContext } from "../src/AuthContext";
import { checkToken } from "../src/cookies";
import { RadioButton, TextInput, Chip } from "react-native-paper";
import { View, Text, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function UserSettings({navigation}) {
    const [selectedDiet, setSelectedDiet] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [allergyList, setAllergyList] = useState([]);
    const {userToken} = useContext(AuthContext);
    const [user, setUser] = useState<string>("?");
    const [dietChange, setDietChange] = useState(false);
    const [allergyChange, setAllergyChange] = useState(false);

    useEffect(() => {
		const checked = checkToken({userToken}.userToken);
        setDietChange(false);

		if (checked && typeof checked.login === 'string') {
			console.log('Login:', checked.login);
			setUser(checked.login);
            var data = {
                login: checked.login,
                item: 'diet'
            }
            callPostGatewayApi('get-history', data)
            .then(async result => {
                console.log(result.item);
                setSelectedDiet(result.item);
                console.log("Diet: ", selectedDiet);
            })
            .catch(error => {
                console.error(error);
            });
            data = {
                login: checked.login,
                item: 'allergies'
            }
            callPostGatewayApi('get-history', data)
            .then(async result => {
                setAllergyList(result.item);
                console.log("Allergies: ", allergyList);
            })
            .catch(error => {
                console.error(error);
            });
		}
	}, []);

    const changeDiet = (newDiet: string) => {
        setSelectedDiet(newDiet)
        setDietChange(true)
    };

    const handleConfirm = () => {
        const data = {
            diet: selectedDiet,
            login: user
        }
        callPostGatewayApi('update-diet', data)
			.then(result => {
				console.log(result)
			})
			.catch (error => {
				console.error(error)
			})

        setDietChange(false);
    };

    const handleDelete = (allergy: string) => {
        const data = {
            login: user,
            action: "delete",
            allergy: allergy
        }

        callPostGatewayApi('update-alleries', data)
			.then(result => {
				console.log(result)
                setAllergyList(result.updated_item.allergies);
			})
			.catch (error => {
				console.error(error)
			});

    };

    const handleNewAllergy = (allergy: string) => {
        setNewAllergy(allergy)
        setAllergyChange(true)
    };

    const handleUpload = () => {
        const data = {
            login: user,
            action: "add",
            allergy: newAllergy
        }

        callPostGatewayApi('update-alleries', data)
			.then(result => {
				console.log(result)
                setAllergyList(result.updated_item.allergies)
			})
			.catch (error => {
				console.error(error)
			})
        
        setAllergyChange(false);
        setNewAllergy("");

    };

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Chip 
            closeIcon="close"
            onPress={() => console.log("Pressed")} 
            onClose={() => handleDelete(title)}
            style={styles.chip}
            textStyle={{ color: "white", fontSize: 16}}>
                {title}
          </Chip>
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Current Diet:</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="no-limit"
                        status={selectedDiet === 'no-limit' ?
                            'checked' : 'unchecked'}
                        onPress={() => changeDiet("no-limit")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>No Limits</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="vegetarian"
                        status={selectedDiet === 'vegetarian' ?
                            'checked' : 'unchecked'}
                        onPress={() => changeDiet("vegetrian")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>Vegetarian</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="gluten-free"
                        status={selectedDiet === 'gluten-free' ?
                            'checked' : 'unchecked'}
                        onPress={() => changeDiet("gluten-free")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>Gluten-Free</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="vegan"
                        status={selectedDiet === 'vegan' ?
                            'checked' : 'unchecked'}
                        onPress={() => changeDiet("vegan")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>Vegan</Text>
                </View>
                <View style={[styles.buttonContainer]}>
                    {dietChange &&
                        <Pressable
                        style={[styles.button, { backgroundColor: "#17f502" }]}
                        onPress={handleConfirm}
                    >
                        <FontAwesome
                            name="check"
                            size={18}
                            color="#25292e"
                            style={styles.buttonIcon}
                        />
                        <Text style={[styles.buttonLabel, { color: "#25292e" }]}>Confirm</Text>
                        </Pressable>
                    }
                </View>
            </View>
            <View>
                <Text style={styles.title}>Allergies:</Text>
                <FlatList
                    data={allergyList}
                    renderItem={({item}) => <Item title={item} />}
                    extraData={allergyList}
                />
                <TextInput
                    style={styles.input}
                    textColor="white"
                    outlineColor="white"
                    activeOutlineColor="green"
                    activeUnderlineColor="green"
                    selectionColor="green"
                    placeholder="Enter Allergy"
                    placeholderTextColor="white"
                    mode="outlined"
                    label="Enter New Allergy"
                    value={newAllergy}
                    onChangeText={text => handleNewAllergy(text)}
                />
                <View style={[styles.buttonContainer]}>
                    {allergyChange && newAllergy !== "" &&
                        <Pressable
                        style={[styles.button, { backgroundColor: "#17f502" }]}
                        onPress={handleUpload}
                    >
                        <FontAwesome
                            name="check"
                            size={18}
                            color="#25292e"
                            style={styles.buttonIcon}
                        />
                        <Text style={[styles.buttonLabel, { color: "#25292e" }]}>Confirm</Text>
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 50,
      },
      radioGroup: {
        flexDirection: 'column',
        marginTop: 0,
        borderRadius: 8,
        backgroundColor: '#000',
        padding: 0,
      },
      radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      radioLabel: {
        fontSize: 16,
        color: 'white',
      },
      title: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 5
      },
      buttonContainer: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 3,
        paddingLeft: 3
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
      input: {
        fontSize: 16,
        backgroundColor: "black",
        width: 165,
        height: 50,
      },
      item: {
        width: 150,
        paddingBottom: 5
      },
      chip: {
        backgroundColor: "green",
      }
});