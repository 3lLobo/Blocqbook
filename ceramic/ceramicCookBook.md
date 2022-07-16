# Ceramic Cook-Book

Follow these steps to get `@self.id` up and running.
Install `glaze-cli`.

```bash
glaze did:create
# save the output seed-key

glaze model:create my-model

# No, you can't import the schema from a file
glaze model:add my-model schema MySchema2 '{"$schema":"http://json-schema.org/draft-07/schema#","title":"MySchema","type":"object","properties":{}}' --key=<seed-key>

glaze model:deploy blocq-book ./blocqBookDeployed.json
```

Check the `./my-model.json` file for the schema-key.

Then:

```bash
glaze model:add my-model definition my-def2 '{"description": "Worqqq", "name": "WorqDef", "schema": <schema-key>}' -k <seed-key>

glaze model:export my-model ./my-model.json
```

Inside `./my-model.json` you will find the definition-key.
This one you will use as key for:

```js
// Handle login and connection first
const [connection, connect, disconnect] = useViewerConnection()

// Now connect to the model we just defined
const record = useViewerRecord('<definition-key>')

record.merge({
  address: window.ethereum.selectedAddress,
  profile: {
    name: 'panda',
    state: 'angry',
  },
})
```


## Resources

To understand Ceramic better:

[Protocol Design](https://developers.ceramic.network/docs/advanced/standards/application-protocols/identity-index/#schemas)


Examples for different Schemas:
- https://github.com/ceramicstudio/datamodels/blob/main/models/identity-accounts-crypto/schemas/CryptoAccounts.json
- https://github.com/ceramicstudio/datamodels/blob/main/models/3id-keychain/schemas/ThreeIdKeychain.json

All the Ceramic-react hooks:
[@seld.id/react](https://developers.ceramic.network/reference/self-id/modules/react/#read-a-viewer-record)

[Glaze-cli docs](https://developers.ceramic.network/tools/glaze/development/#__tabbed_5_2)

