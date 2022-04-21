# Medusa Plugin for GSTIN

Hi, GSTIN is a critical piece of information that vendors in India need to make purchases from other vendors. This simple plugin extends the address table to include GSTIN. The rational being that the GSTIN of customer can change based on the location to which the goods are shipped and delivered.

# Usage
## Prerequisites
You should have setup the medusa extender and run medex init as described [here](https://adrien2p.github.io/medusa-extender/#/?id=validator)

## Install
```
npm install medusa-plugin-gstin
```
or
```
npm install --legacy-peer-deps medusa-plugin-gstin
```
## Configure

add the module to your main.ts 
```
import { AddressModule } from 'medusa-plugin-gstin/src/modules/address/address.module'
```
add the address module to 
```
await  new  Medusa(resolve(__dirname, '..'), expressInstance).load([AddressModule]);
```
# Disclaimer
The code has been tested on limited testcases, in case of any unforseen bugs please raise an issue or submit a PR.
# License
MIT