# Joogal-Testing
The application is written by [Tobias Feltes](https://github.com/tobi110289) and further information is found under [Joogal](https://github.com/tobi110289/Joogal-public). Therefore the code can't be publicly shared here.

<p align="center">
<img src="./assets/joogal.gif" alt="logo-gif" style="width: 100%;" />
</p>
<p align="center">
<img src="./assets/joogal-landing.gif" alt="phone-gif" style="width: 100%;" />
</p>

 ## About
 Joogal is a React-Native-App to connect creative artists from different fields to collaborate with each other. 


 My role as collaborator was mainly the testing and debugging of this React Native app.

## Testing tools
- [Jest](https://jestjs.io/)
- [Mocha](https://mochajs.org/)

## Testing philosphoy
To test this application I followed the widely endorsed guidelines by [Kent C. Doods](https://kentcdodds.com/) and used Jest as testing framework to realize this testing philosophy.

The general principles are ...

- ...to write maintenable tests that don't break on every refactor of the code
- to test main features and functionalities instead of details
- to aim for tests that give you confidence in your code
- to test only what matters for the user and the way the customer is going to use the app

## Experience and insights
I wrote integration- and unit-tests for Joogal, including mock-ups of API-Services and routing inside the app. These points conclude my experience:

- Jest is a powerful, easy to use testing tool with a good readability
- Even with the newest version of the [React-Native-Testing-Library](https://github.com/callstack/react-native-testing-library), it remains a challenge to fully test React-Native and Expo-apps, since not all tools of the library are setup to work with this quite new framework
- Just testing what the user sees and cares about, cuts the amount of needed tests down to a reason- and managable amount

