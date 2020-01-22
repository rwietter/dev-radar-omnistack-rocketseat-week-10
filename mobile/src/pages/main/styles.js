import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  callout: {
    width: 270,
    height: 80,
    borderRadius: 56,
    borderStyle: 'dashed'
  },
  name: {
    fontFamily: 'raleway-bold',
    fontSize: 25,
    fontWeight: 'bold'
  },
  bio: {
    color: '#6666',
    fontFamily: 'raleway-regular',
    marginTop: 5
  },
  technologys: {
    marginTop: 5,
    fontFamily: 'raleway-regular'
  },
  form: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    display: 'flex',
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4Dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
})

export default styles
