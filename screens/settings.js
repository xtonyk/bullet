
import 		React 					from 'react';
import { 	connect 			} 	from 'react-redux';
import { 	ScrollView 			,
			Text 				,
			TouchableOpacity 	,
			View 				} 	from 'react-native';
import { 	Ionicons 			} 	from '@expo/vector-icons';
import 		scene 					from '../styles/scene';
import 		style 					from '../styles/list-control';
import 		analytics 				from '../utilities/analytics';

export default connect (

	state => ({
		language 	: state.language ,
		theme 		: state.theme
	})

) ( class Settings extends React.Component {

	static navigationOptions = ({ screenProps }) => {

		const 	language 	= screenProps.language 	,
				theme 		= screenProps.theme 	;

		return {

			title 		: language.screens.settings.title ,
			tabBarIcon 	: ({ focused }) => {

				return (
					<Ionicons
						name 	= { 'ios-settings-outline' 						}
						size 	= { 32 											}
						color 	= { focused ? theme.disabled : theme.secondary 	}
					/>
				);

			}
		};
	};

	settings () {

		const language = this.props.language;

		return [
			{
				name 	: language.screens.theme.title 			,
				url 	: 'Theme'
			} ,
			
			{
				name 	: language.screens.language.title 		,
				url 	: 'Language'
			} ,
			
			{
				name 	: language.screens.themes.title  		,
				url 	: 'Themes'
			} ,
			
			{
				name 	: language.screens.translations.title  	,
				url 	: 'Translations'
			} ,
			
			{
				name 	: language.screens.donate.title  		,
				url 	: 'Donate'
			}
		];
	}

	contents () {

		const 	navigate 	= this.props.navigation.navigate 	,
				theme 		= this.props.theme 					;

		return this.settings ().map (( setting , index ) => {

			const background = index % 2 === 0 ? theme.primary : theme.base;

			return (
				<TouchableOpacity 
					key 	= { index 						}
					onPress = {() => {
					
						analytics.event ( 'settings' , 'navigate' , setting.url.toLowerCase 	());
						navigate 		( setting.url 											);
					}}
					style 	= {{ 
						...style ( theme ).control ,
						...{
							backgroundColor : background
						}
					}}
				>
					<Text style = { style ( theme ).text 		}>
						{ setting.name }
					</Text>
					<Ionicons
						name 	= { 'ios-arrow-forward-outline' }
						size 	= { 18 							}
						color 	= { theme.secondary 			}
					/>
				</TouchableOpacity>
			);
		});

	}

	render () {

		const theme = this.props.theme;

		analytics.screen 	( 'settings:200' 			);
		return 				(
			<ScrollView style = { scene ( theme ).body }>
				{ this.contents ()}
			</ScrollView>
		);

	}
});
