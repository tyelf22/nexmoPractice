# Basic Nexmo GUI

This is an application that allows you to send text messages using the Nexmo API(Vonage). Sign up [here](https://www.vonage.com/communications-apis/campaigns/nexmo-is-now-vonage-apis/) to get your API key.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

After cloning the repo, install the node modules.

```
npm install
```

### Enter API Keys

```javascript
//Use your own api key information here
const nexmo = new Nexmo({
    apiKey: apiConfig.apiKey,
    apiSecret: apiConfig.apiSecret,
  })

//Use your own virtual phone number that is created
const from = apiConfig.phoneNumber
```

