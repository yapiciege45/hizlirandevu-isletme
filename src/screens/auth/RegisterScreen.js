import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import TopBarComponent from '../../components/shared/TopBarComponent';
import InputComponent from '../../components/shared/InputComponent';
import FullNameIcon from '../../svgs/input/FullNameIcon';
import { BusinessIcon } from '../../svgs/input/BusinessIcon';
import axios from 'axios';
import globalFetch from '../../config/api';
import Toast from 'react-native-root-toast';
import { PasswordIcon } from '../../svgs/input/PasswordIcon';
import { PhoneIcon } from '../../svgs/input/PhoneIcon';

export default function RegisterScreen({ navigation }) {
    const [fullName, setFullName] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [phone, setPhone] = useState('')
    const [agreements, setAgreements] = useState(false)
    const [secondStep, setSecondStep] = useState(false)
    const [code, setCode] = useState('')

    const register = async (phoneNumber) => {

      if(!secondStep) {
        if(fullName != '' && businessName != '' && phone != '') {
          if(agreements) {
            const data = await globalFetch({
              endpoint: '/auth/check-phone',
              body: {
                phone: phoneNumber
              },
              method: 'POST'
            })
  
            if(data.status == 'success') {
              setSecondStep(true)
            }
            
          } else {
            Toast.show('Sözleşmeyi kabul etmeniz gerekmekte!', {
              duration: Toast.durations.SHORT,
            });
          }
        } else {
          Toast.show('Tüm alanlar doldurulmalıdır!', {
            duration: Toast.durations.SHORT,
          });
        }
      } else {
        if(code == '') {
          Toast.show('Lütfen telefonunuza gelen şifreyi giriniz!', {
            duration: Toast.durations.SHORT,
          });
        } else {
          const data = await globalFetch({
            endpoint: '/auth/verify',
            body: {
              phone: phoneNumber,
              code,
              name: fullName,
              business_name: businessName
            },
            method: 'POST'
          })

          if(data.status == 'success') {
            navigation.navigate('Login', {
              phoneNumber: phone
            })
          }
        }
      }
      
    }

  return (
    <View style={styles.container}>
      <TopBarComponent name="Kayıt Ol" question='Lorem' navigation={navigation} />
      <View style={styles.center_container}>
        <View style={styles.center_container_inner}>
          <Text style={styles.center_container_top_text}>
            Ücretsiz deneme sürümünü başlatın
          </Text>
          <Text style={styles.center_container_top_bottom_text}>
            Kredi kartı ve taahhüd gerektirmez.
          </Text>
          <Text style={styles.center_container_top_bottom_bottom_text}>
            Ücretsiz ve Premium paketlerimizi inceleyin.
          </Text>
          {
            secondStep ? (
              <InputComponent
                onChangeText={setCode}
                logo={<PasswordIcon />}
                placeholder='Telefonunuza Gelen Kod'
                containerStyle={{marginTop: 16}}
                value={code}
              />
            ) : (
              <>
                <InputComponent
                  onChangeText={setFullName}
                  logo={<FullNameIcon />}
                  placeholder='Ad Soyad'
                  containerStyle={{marginTop: 16}}
                  value={fullName}
                />
                <InputComponent
                  onChangeText={setBusinessName}
                  logo={<BusinessIcon />}
                  placeholder='Salon Adı'
                  containerStyle={{marginTop: 10}}
                  value={businessName}
                />
                <InputComponent
                  onChangeText={setPhone}
                  logo={<PhoneIcon />}
                  placeholder='Telefon Girin'
                  containerStyle={{marginTop: 10}}
                  keyboardType='phone-pad'
                  value={phone}
                />
              </>
            )
          }
          
        </View>
      </View>
      <View style={styles.bottom_container}>
        <View style={styles.bottom_container_top}>
          <TouchableOpacity style={styles.bottom_container_top_text_top_container} onPress={() => setAgreements(!agreements)}>
            <View style={styles.agreement_container}>
              <View style={[styles.agreement_inner, agreements && {display: 'block'}]}></View>
            </View>
            <Text style={styles.agreement_text}>
              Kampanyalardan haberdar olmak için, tarafıma gönderilecek mesaj ve çağrılara izin veriyorum
            </Text>
          </TouchableOpacity>
          <View style={styles.bottom_container_line}></View>
          <View style={styles.bottom_container_top_text_bottom_container}>
          <Text style={{fontSize: 13, fontFamily: 'euclidRegular', color: 'rgba(65, 74, 91, 1)', textAlign: 'center'}}>
            Sisteme kayıt olarak kullanım ve gizlilik sözleşmesini kabul etmiş sayılırsınız: <Text style={{fontSize: 13, fontFamily: 'euclidRegular', color: 'rgba(45, 129, 244, 1)', textDecorationLine: 'underline'}}>Gizlilik ve Kullanım Şartları</Text>
            </Text>
          </View>
        </View>
        <View style={styles.bottom_container_bottom}>
          <TouchableOpacity style={styles.register_button} onPress={() => register(phone)}>
            <Text style={styles.register_button_text}>Şimdi Kaydol</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.login_button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.login_button_text}>Zaten bir hesabın var mı? <Text style={[styles.login_button_text, {textDecorationLine: 'underline'}]}>Giriş Yap!</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 36,
    backgroundColor: 'white'
  },
  top_bar: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },
  center_container: {
    flex: 0.6,
    alignItems: 'center',
  },
  center_container_inner: {
    flex: 1,
    width: '100%',
  },
  bottom_container: {
    flex: 0.3,
  },
  center_container_top_text: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'euclidSemiBold',
    color: 'rgba(65, 74, 91, 1)',
    textAlign: 'center'
  },
  center_container_top_bottom_text: {
    marginTop: 10,
    fontSize: 12,
    fontFamily: 'euclidRegular',
    color: 'rgba(65, 74, 91, 0.65)',
    textAlign: 'center'
  }
  ,
  center_container_top_bottom_bottom_text: {
    fontSize: 12,
    fontFamily: 'euclidRegular',
    color: 'rgba(65, 74, 91, 0.65)',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  bottom_container_top: {
    flex: 0.4,
    justifyContent: 'space-around'
  },
  bottom_container_bottom: {
    flex: 0.5,
    justifyContent: 'flex-end'
  },
  bottom_container_top_text_top_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  agreement_container: {
    width: 13.73,
    height: 13.73,
    borderWidth: 0.8,
    borderRadius: '50%',
    borderColor: 'rgba(65, 74, 91, 1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  agreement_inner: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'rgba(45, 129, 244, 1)',
    display: 'none'
  },
  agreement_text: {
    fontSize: 12,
    color: 'rgba(65, 74, 91, 0.6)',
    fontFamily: 'euclidRegular',
    paddingLeft: 15
  },
  bottom_container_line: {
    height: 1,
    backgroundColor: 'rgba(65, 74, 91, 0.1)'
  },
  register_button: {
    height: 60,
    width: '100%',
    backgroundColor: 'rgba(45, 129, 244, 1)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  register_button_text: {
    fontSize: 15,
    color: 'white',
    fontWeight: '500',
    fontFamily: 'euclidMedium'
  },
  login_button: {
    alignItems: 'center'
  },
  login_button_text: {
    fontSize: 13,
    fontFamily: 'euclidRegular',
    color: 'rgba(65, 74, 91, 1)'
  }
});
