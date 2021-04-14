/* eslint-disable prettier/prettier */
import * as React from 'react';
import { Button, View, Text } from 'react-native';

function CounterScreen() {
    const [counter, setCounter] = React.useState(0);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <View style={{ marginTop: 20 }}>
                <View style={{ marginBottom: 20 }}>
                    <Text>Counter value: {counter}</Text>
                </View>

                <Button onPress={() => setCounter((c) => c + 1)} title="Increment Counter" />

                <View style={{ marginTop: 10 }}>
                    <Button onPress={() => setCounter(0)} title="Reset Counter" />
                </View>
            </View>
        </View>
    );
}

export default CounterScreen;
