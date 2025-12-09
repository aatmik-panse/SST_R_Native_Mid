import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const NewsWebViewScreen = ({ route, navigation }) => {
    const { url, title } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title || 'Article',
        });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url }} startInLoadingState />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default NewsWebViewScreen;
