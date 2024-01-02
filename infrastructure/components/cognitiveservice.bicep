@description('Cognitive service name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

resource cognitiveService 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name:  name
  tags:  tags
  location: location
  kind: 'CognitiveServices'
  sku: {
    name: 'S0'
  }
  properties: {
    customSubDomainName: toLower(name)
    disableLocalAuth: true
  }
}

output cognitiveServicesId string = cognitiveService.id
