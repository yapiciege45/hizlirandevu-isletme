import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackButtonComponent from '../../svgs/auth/BackButtonComponent';
import QuestionMarkComponent from '../../svgs/auth/QuestionMarkComponent';

export default function TopBarComponent({ question = '', navigation, name = '' }) {

    const [questionIsShown, setQuestionIsShown] = useState(false)

  return (
    <View style={styles.top_bar}>
        <TouchableOpacity style={styles.back_button} onPress={() => navigation.goBack()}>
            <BackButtonComponent />
        </TouchableOpacity>
        <Text style={styles.text}>
            {name}
        </Text>
        <View>
            {
                question != '' && (
                    <TouchableOpacity style={styles.question_container} onPress={() => setQuestionIsShown(!questionIsShown)}>
                        <QuestionMarkComponent />
                        {
                            questionIsShown &&
                            <View style={styles.question_text_container}>
                                <Text style={styles.question_text}>{question}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                )
            }
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    top_bar: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100
    },
    back_button: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(65, 74, 91, 0.05)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'rgba(65, 74, 91, 1)',
        fontFamily: 'euclidSemiBold',
        fontWeight: '600',
        fontSize: 15
    },
    question_container: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(65, 74, 91, 1)',
        position: 'relative'
    },
    question_text_container: {
        position: 'absolute',
        top: 50,
        right: 0,
        width: 200,
        borderRadius: 8,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 10
    }
  });