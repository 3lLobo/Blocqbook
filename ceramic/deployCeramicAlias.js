// FLAG: not working!

import { ModelManager } from '@glazed/devtools'

const API_URL = 'https://ceramic-clay.3boxlabs.com'

export async function deployCeramicAlias(ceramic3Did) {
  // const ceramic = authenticateDID(ceramic3Did)
  const ceramic = await getCeramic()

  const manager = new ModelManager({ ceramic })

  await manager.createSchema('MyBlocqSchema', {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'MyBlocqSchema',
    type: 'object',
    properties: {
      blocqContacts: {
        type: 'array',
        items: {
          profile: {
            type: 'object',
            properties: {},
          },
        },
      },
    },
  })

  const model = manager.toJSON()
  console.log('The Model: ', model)

  const clonedManager = ModelManager.fromJSON({ ceramic, model })

  const modelAliases = await manager.deploy()
  console.log('The Model Aliases: ', modelAliases)
}
