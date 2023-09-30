import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const slides = [
  {
    image: require('../../../assets/images/auth/AuthSliderOne.png'),
    title: 'Gider gelir takibi',
    description: 'Kazançlarınızı ve harcamalarınızı tek yerden takip edin.'
  },
  {
    image: require('../../../assets/images/auth/AuthSliderTwo.png'),
    title: 'Adisyon ve satış yönetimi',
    description: 'Adisyonlarınızı ve ürün satışlarınızı ne kadar kolay yönetebileceğinize inanamayacaksınız!'
  },
  {
    image: require('../../../assets/images/auth/AuthSliderThree.png'),
    title: 'Müşterilerinizi Yönetin',
    description: 'Müşterilerinizi yönetmek artık çok kolay.'
  },
  {
    image: require('../../../assets/images/auth/AuthSliderFour.png'),
    title: 'Geribildirim toplayın',
    description: 'Kazançlarınızı ve harcamalarınızı tek yerden takip edin.'
  },
  {
    image: require('../../../assets/images/auth/AuthSliderFive.png'),
    title: 'Randevularınız hatırlansın',
    description: 'Ac adipiscing neque sodales fringilla consequat duis aliquam.'
  },
  {
    image: require('../../../assets/images/auth/AuthSliderSix.png'),
    title: 'Randevu Takvimini Yönetin',
    description: 'Gravida quisque varius odio praesent sapien ut sit. Tincidunt.'
  }
];


export default function SliderScreen({ navigation }) {

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.top_button_container}>
          <TouchableOpacity style={styles.top_skip_button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.top_skip_button_text}>Adımı Atla</Text>
          </TouchableOpacity>
        </View>
        <View style={{width: '100%', flex: 0.9}}>
          <SwiperFlatList
              paginationActiveColor='rgba(65, 74, 91, 1)'
              paginationDefaultColor='rgba(65, 74, 91, 0.35)'
              autoplay
              style={{width: '100%', flex: 1}}
              autoplayDelay={2}
              autoplayLoop
              index={2}
              showPagination
              data={slides}
              renderItem={({ item }) => (
                  <View style={styles.child}>
                      <Image
                        source={item.image}
                      />
                      <Text style={styles.slider_title}>{item.title}</Text>
                      <Text style={styles.slider_description}>{item.description}</Text>
                  </View>
              )}
          />
        </View>
        <View style={styles.bottom_buttons}>
            <TouchableOpacity style={styles.deneme_button} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.deneme_button_text}>Ücretsiz Denemenizi Başlatın</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.login_button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.login_button_text}>Giriş Yap</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    )

  
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 36,
        backgroundColor: 'white'
    },
    top_button_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
    },
    top_skip_button: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        width: 90.68,
        height: 39.07,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 38
    },
    top_skip_button_text: {
        fontSize: 12,
        fontFamily: 'euclidRegular'
    },
    child: { 
        width: width,
        flex: 1,
    },
    text: { fontSize: 16, textAlign: 'center' },
    slider_title: {
      fontSize: 24,
      fontWeight: '600',
      fontFamily: 'euclidSemiBold'
    },
    slider_description: {
      fontWeight: '500',
      fontFamily: 'euclidMedium',
      fontSize: 14
    },
    bottom_buttons: {
      justifyContent: 'flex-end',
      width: '100%',
      flex: 0.4
    },
    deneme_button: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'rgba(65, 74, 91, 0.25)',
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      marginTop: 24
    }
    ,
    deneme_button_text: {
      color: 'rgba(65, 74, 91, 0.6)',
      fontSize: 15,
      fontWeight: '500',
      fontFamily: 'euclidMedium',
    }
    ,
    login_button: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'rgba(45, 129, 244, 1)',
      backgroundColor: 'rgba(45, 129, 244, 1)',
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      height: 60,
      marginTop: 24
    },
    login_button_text: {
      color: 'white',
      fontSize: 15,
      fontWeight: '500',
      fontFamily: 'euclidMedium',
    }
})