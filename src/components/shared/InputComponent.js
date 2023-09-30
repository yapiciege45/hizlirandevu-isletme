import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function InputComponent({ value = '', containerStyle, height = 60, inputStyle, logoContainerStyle, logo, placeholder = '', onChangeText, placeholderTextColor = 'rgba(65, 74, 91, 0.65)', keyboardType = 'default' }) {
  return (
    <View style={[styles.input_container, containerStyle]}>
        {
            logo && <View style={[styles.logo_container, logoContainerStyle]}>
                    {logo}
                </View>
        }
      <TextInput 
        style={[styles.input, inputStyle, logo && {width: '100%'}]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    input_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        borderWidth: 1,
        borderColor: 'rgba(65, 74, 91, 0.1)',
        borderRadius: 18
    },
    logo_container: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: '100%'
    }
})