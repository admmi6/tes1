import React, { PureComponent } from 'react';
import {
Alert,
ScrollView,
StyleSheet,
Text,
TextInput,
TouchableOpacity,
View
} from 'react-native';

const endpoint = 'https://my-bookmarks-api.herokuapp.com/api/bookmarks';

class MainApp extends PureComponent {
state = {
  result: '',
  title: '',
  url: '',
  };
// Defined later
onLoad = async () => {
  this.setState({ result: 'Loading, please wait...' });
  const response = await fetch(endpoint, {
    method: 'GET',
  });
  const result = await response.text();
  this.setState({ result });
}

onSave = async () => {
  const { title, url } = this.state;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      category_id: 1,
      title,
      url,
    }),
  });

  const result = await response.json();
  if (result.success === false) {
    Alert.alert('Error', 'Bookmark Gagal Disimpan');
  } else {
    Alert.alert('Sukses', 'Bookmark Tersimpan');
    this.onLoad();
  }
}

onTitleChange = (title) => this.setState({ title });
onUrlChange = (url) => this.setState({ url });

  render() {
      const { result, title, url } = this.state;
        return (
          <View style={styles.container}>
            <Text style={styles.toolbar}>Tambah Bookmark Baru</Text>
            <ScrollView style={styles.content}>
                <TextInput
                    style={styles.input}
                    onChangeText={this.onTitleChange}
                    value={title}
                    placeholder="Judul"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={this.onUrlChange}
                    value={url}
                    placeholder="URL:www.google.com"
                />
                <TouchableOpacity onPress={this.onSave} style={styles.btn}>
                    <Text>Simpan</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.preview}
                    value={result}
                    placeholder="Hasil..."
                    editable={false}
                    multiline
                    />
            </ScrollView>
          </View>
        );
      }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#CE93D8',
    color: '#fff',
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  preview: {
    backgroundColor: '#bdc3c7',
    flex: 1,
    height: 500,
  },
    input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    height: 40,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
  btn: {
    backgroundColor: '#CE93D8',
    padding: 10,
    borderRadius: 3,
    marginBottom: 30,
    alignItems: 'center'

  },
});

export default MainApp;
