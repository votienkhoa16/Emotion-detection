import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const data = [
          {key: 'D1',Date:'ac'},
          {key: 'D2',Date:'ac'},
          {key: 'D3',Date:'ac'},
          {key: 'D4',Date:'ac'},
          {key: 'D5',Date:'ac'},
          {key: 'D6',Date:'ac'},
          {key: 'D7',Date:'ac'},
          {key: 'D8',Date:'ac'},
          {key: 'D9',Date:'ac'},
          {key: 'D10',Date:'ac'},
          {key: 'D11',Date:'ac'},
          {key: 'D12',Date:'ac'},
          {key: 'D12A',Date:'ac'},
          {key: 'D14',Date:'ac'},
          {key: 'D15',Date:'ac'},
          {key: 'D16',Date:'ac'},
          {key: 'D17',Date:'ac'},
        ];

const FlatListBasics = () => {
  return (
    <View style={styles.container}>

    <Text style={styles.logintext}>History</Text>
    <Text style={styles.stat}>Display the status</Text>


     <View style={styles.container2}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>{ 
          return(
            <View style={styles.listItem}>
            <Text style={styles.item}>{item.key}</Text>
            <Text style={styles.item}>{item.Date}</Text>
            </View>
          )
        }
        }
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  paddingTop:22,
  backgroundColor: '#8E05C2',
   
  },
  container2: {
  marginTop: 20,
   
  },
    logintext:{
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 29,
    backgroundColor: '#8E05C2',
    color:'#fff',
    textAlign:'center',
    
  },

  stat:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
    color:'#fff',
    textAlign:'center',
    
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    
    marginVertical: 4,
    marginHorizontal: 8,
    color:"#fff",
  },

  listItem: {
    
    borderWidth: 0.5,
    borderColor: "#fff",
    padding: 5,
  },

 
  
});

export default FlatListBasics;