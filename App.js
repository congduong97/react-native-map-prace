import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polygon} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import Carousel from 'react-native-snap-carousel';

export class App extends Component {
  state = {
    coordiantes: [
      {
        name: 'AAAAA',
        latitude: 37.8025259,
        longitude: -122.4351431,
        image: require('./pepe.jpg'),
      },
      {
        name: 'BBBBB',
        latitude: 37.7896386,
        longitude: -122.421646,
        image: require('./pepe.jpg'),
      },
      {
        name: 'CCCCC',
        latitude: 37.7665248,
        longitude: -122.4161628,
        image: require('./pepe.jpg'),
      },
      {
        name: 'DDDDD',
        latitude: 37.7734153,
        longitude: -122.4577787,
        image: require('./pepe.jpg'),
      },
      {
        name: 'EEEEE',
        latitude: 37.7948605,
        longitude: -122.4596065,
        image: require('./pepe.jpg'),
      },
      {
        name: 'FFFFF',
        latitude: 37.8025259,
        longitude: -122.4351431,
        image: require('./pepe.jpg'),
      },
    ],
  };

  componentDidMount() {
    this.requestLocationPermisstion();
  }

  requestLocationPermisstion = async () => {
    if (Platform.OS == 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('Iphone', response);
      if (response === 'granted') {
        this.locationCurrentPosition();
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android', response);
      if (response == 'granted') {
        this.locationCurrentPosition();
      }
    }
  };

  locationCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      posotion => {
        console.log('current', JSON.stringify(posotion));

        let initialPosition = {
          latitude: posotion.coords.latitude,
          longitude: posotion.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        this.setState({initialPosition});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  renderCarouseItem = ({item}) => {
    <View style={styles.cardContainer}>
      <Text style={styles.titleStyle}>{item.name}</Text>
      <Image style={styles.cardImage} source={item.image} />
    </View>;
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          initialRegion={this.state.initialPosition}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
          }}>
          <Polygon
            coordinates={this.state.coordiantes}
            fillColor={'rgba(100,100,200,0.3)'}
            strokeWidth={3}
          />

          {this.state.coordiantes.map(marker => (
            <Marker
              key={marker.name}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
            />
          ))}
        </MapView> */}
        <Carousel
          data={this.state.coordiantes}
          renderItem={this.renderCarouseItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={300}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  carousel: {
    // position: 'absolute',
    // bottom: 0,
    // marginBottom: 48,
    height: 200,
  },
  cardContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    height: 200,
    width: 300,
    padding: 24,
    borderRadius: 24,
  },
  cardImage: {
    height: 120,
    width: 300,
    position: 'absolute',
    bottom: 0,
  },
  titleStyle: {},
});

export default App;
