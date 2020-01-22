import { MaterialIcons } from '@expo/vector-icons'
import * as Font from 'expo-font'
import { getCurrentPositionAsync, requestPermissionsAsync } from 'expo-location'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import MapView, { Callout, Marker } from 'react-native-maps'
import api from '../../services/api'
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket'
import styles from './styles'

function Main({ navigation }) {
  const [devs, setDevs] = useState([])
  const [currentRegion, setCurrentRegion] = useState(null)
  const [techs, setTechs] = useState('')

  useEffect(() => {
    Font.loadAsync({
      'raleway-bold': require('../../../assets/fonts/Raleway-Bold.ttf'),
      'raleway-regular': require('../../../assets/fonts/Raleway-Regular.ttf')
    })

    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync()
      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        })

        const { latitude, longitude } = coords

        setCurrentRegion({
          latitude,
          longitude,
          longitudeDelta: 0.04,
          latitudeDelta: 0.04
        })
      }
    }
    loadInitialPosition()
  }, [])

  // Monitora se o setDevs foi executado para executar o socketio
  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]))
  }, [devs])

  function setupWebSocket() {
    disconnect()
    const { latitude, longitude } = currentRegion
    connect(latitude, longitude, techs)
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    })
    setDevs(response.data.devs)
    setupWebSocket()
  }

  function handleRegionChange(region) {
    setCurrentRegion(region)
  }

  if (!currentRegion) {
    return null
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChange}
        initialRegion={currentRegion}
        style={styles.map}>
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}>
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username
                })
              }}>
              <View style={styles.callout}>
                <Text style={styles.name}>{dev.name}</Text>
                <Text style={styles.bio}>{dev.bio}</Text>
                <Text style={styles.technologys}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.form}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search developers for technologies"
          placeholderTextColor="#999"
          autoCapitalize="words" // primeira letra, caixa alta
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />
        <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Main

// desafio KeyBoard event listner expo subir form
