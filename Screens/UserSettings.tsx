import React, { useContext } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useState, ChangeEvent, useEffect } from "react";
import { callPostGatewayApi } from "../src/request";
import { AuthContext } from "../src/AuthContext";
import { checkToken } from "../src/cookies";
import { RadioButton, TextInput, Chip } from "react-native-paper";
import { View, Text, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const columns = [
    {
      key: "allergy",
      label: "ALLERGY",
    },
    {
      key: "action",
      label: "ACTION",
    },
];



export default function UserSettings({navigation}) {
    const [selectedDiet, setSelectedDiet] = useState("");
    const [newAllergy, setNewAllergy] = useState("");
    const [allergyList, setAllergyList] = useState([]);
    const {userToken} = useContext(AuthContext);
    const [user, setUser] = useState<string>("?");

    // const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));

    useEffect(() => {
		const checked = checkToken({userToken});

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
                console.log(result.item);
                // interface AllergyList {
                //     key: string;
                //     allergy: string;
                //     action: string;
                // }

                // const allergies: AllergyList[] = result.item
                // const allergyArray: Array<{ key: string, allergy: string, action: string }> = []
                // allergies.forEach(element => {
                //     const dict = {
                //         key: element.allergy,
                //         allergy: element.allergy,
                //         action: element.action
                //     }
                //     allergyArray.push(dict)
                // })

                setAllergyList(result.item)
            })
            .catch(error => {
                console.error(error);
            });
		}
	}, []);

    // const [value, setValue] = useState("no-limit");
    // const [selectedValue, setSelectedValue] = useState("no-limit");
    // const [isSelectionChanged, setIsSelectionChanged] = useState(true);

    // const handleInputChange = (e: any) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value,
    //     });
    //   };

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     const newValue = event.target.value;
    //     console.log(value, rowData)
    //     setSelectedValue(newValue);
    //     setIsSelectionChanged(!isSelectionChanged);
    // };

    // const handleConfirm = () => {
    //     setValue(selectedValue);
    //     setIsSelectionChanged(true); // Reset selection changed state
    //     const data = {
    //         diet: selectedValue,
    //         login: user
    //     }
    //     callPostGatewayApi('update-diet', data)
	// 		.then(result => {
	// 			console.log(result)
	// 		})
	// 		.catch (error => {
	// 			console.error(error)
	// 		})
    // };
    // const handlClick = () => {
    //     setIsFormEnab(!isFormEnab); // Toggle the state
    //     //setRowData((prevData) => [...prevData, { key: "2", allergy: "None", action: "stee" }]);
    //     console.log(rowData);
    // };
    // const handleDelete = (allegry_: string) => {
    //     const data = {
    //         login: user,
    //         action: "delete",
    //         allergy: allegry_
    //     }

    //     callPostGatewayApi('update-alleries', data)
	// 		.then(result => {
	// 			console.log(result)
	// 		})
	// 		.catch (error => {
	// 			console.error(error)
	// 		});
        
    //     const updatedRows = rowData.filter(item => item.allergy !== allegry_);
    //     setRowData(updatedRows);
        
    // }
    // const handleUpload = () => {
    //     console.log(formData)
        
    //     if(!formData){
    //         return
    //     }
    //     const data = {
    //         login: user,
    //         action: "add",
    //         allergy: formData["input"]
    //     }

    //     callPostGatewayApi('update-alleries', data)
	// 		.then(result => {
	// 			console.log(result)
	// 		})
	// 		.catch (error => {
	// 			console.error(error)
	// 		})
        
    //     setIsFormEnab(false)
    //     setRowData(prevItems => [...prevItems, {key: "2", allergy: formData["input"], action: "remove"}])

    // }
    // const renderCell = (item: { key: string; allergy: string; action: string; }, columnKey: any) => {
    //     if(item.key === "0"){
    //         if(columnKey === "allergy"){
    //             return (
    //                 <Input
    //                     name="input"
    //                     value={formData.input}
    //                     onChange={handleInputChange}
    //                     isDisabled={!isFormEnab}
    //                     placeholder={String(isFormEnab)}
    //                 />
    //             )
    //         }
    //         else{
    //             return (
    //                 <Button
    //                 onClick={isFormEnab ? handleUpload: handlClick}
    //                 color={isFormEnab ? 'success' : 'success'}
    //                 >
    //                 {isFormEnab ? 'Submit' : 'Enable Form'}
    //                 </Button>
    //              )
    //         }
    //     }
    //     else{
    //         if(columnKey === "allergy"){
    //             return (item.allergy)
    //         }
    //         else{
    //             return (<Button color="danger" onClick={() => handleDelete(item.allergy)}>
    //                         Remove
    //                     </Button>)
    //         }
    //     }
    // }

    const Item = ({ title }) => (
        <View style={styles.item}>
          <Chip>{title}</Chip> 
        </View>
    );
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Current Diet:</Text>
            <Text style={styles.title}>{selectedDiet}</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="no-limit"
                        status={selectedDiet === 'no-limit' ?
                            'checked' : 'unchecked'}
                        onPress={() => setSelectedDiet("no-limit")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>No Limits</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="vegetarian"
                        status={selectedDiet === 'vegetarian' ?
                            'checked' : 'unchecked'}
                        onPress={() => setSelectedDiet("vegetarian")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>Vegetarian</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="gluten-free"
                        status={selectedDiet === 'gluten-free' ?
                            'checked' : 'unchecked'}
                        onPress={() => setSelectedDiet("gluten-free")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>Gluten-Free</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="vegan"
                        status={selectedDiet === 'vegan' ?
                            'checked' : 'unchecked'}
                        onPress={() => setSelectedDiet("vegan")}
                        color="green"
                    />
                    <Text style={styles.radioLabel}>Vegan</Text>
                </View>
                <View style={[styles.buttonContainer]}>
                    <Pressable
                        style={[styles.button, { backgroundColor: "#17f502" }]}
                        //onPress={{}}
                    >
                        <FontAwesome
                            name="check"
                            size={18}
                            color="#25292e"
                            style={styles.buttonIcon}
                        />
                        <Text style={[styles.buttonLabel, { color: "#25292e" }]}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
            <View>
                <View style={styles.listContainer}>
                    <Text style={styles.title}>Allergies:</Text>
                    <FlatList
                        data={allergyList}
                        renderItem={({item}) => <Item title={item.key} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
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
                    secureTextEntry
                    value={newAllergy}
                    onChangeText={text => setNewAllergy(text)}
                />
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

      },
      listContainer: {

      }
});