/**
 * Created by lmy2534290808 on 2017/9/14.
 */
import { View, StyleSheet, Text } from 'react-native';

import React, { Component, PropTypes } from 'react';



import { Avatar, Card, ListItem, Toolbar } from 'react-native-material-ui';

const styles = StyleSheet.create({

    textContainer: {

        paddingHorizontal: 16,

        paddingBottom: 16,

    },

});



const propTypes = {


};



class CardSpec extends Component {

    render() {

        return (

            <View style={{flex:1}}>

                <Toolbar

                    leftElement="arrow-back"

                    onLeftElementPress={() => {}}

                    centerElement='card'

                />

                <Card onPress={()=>{}}>

                    <ListItem

                        leftElement={<Avatar text="JM" />}

                        centerElement={{

                            primaryText: 'John Mitri',

                            secondaryText: '3 weeks ago',

                        }}

                    />

                    <View style={styles.textContainer}>

                        <Text>

                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem

                            accusantium doloremque laudantium,

                            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et

                            quasi architecto beatae vitae dicta sunt explicabo.

                        </Text>

                    </View>

                </Card>

                <Card>

                    <ListItem

                        leftElement={<Avatar text="MW" />}

                        centerElement={{

                            primaryText: 'Mike Wiliams',

                            secondaryText: '4 weeks ago',

                        }}

                    />

                    <View style={styles.textContainer}>

                        <Text>

                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,

                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi

                            ut aliquip ex ea commodo consequat.

                        </Text>

                    </View>

                </Card>

            </View>

        );

    }

}



CardSpec.propTypes = propTypes;



export default CardSpec;