@description('Cognitive service name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

@description('Principals to assign Cognitive Services Contributor access')
param principals array = []

@description('Cognitive Services Contributor role definition id')
param cognitiveServiceContributorRole string = '/providers/Microsoft.Authorization/roleDefinitions/25fbc0a9-bd7c-42a3-aa1a-3b75d497ee68'

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

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = [ for principal in principals :{
  scope: cognitiveService
  name: guid(cognitiveService.id, principal.id, cognitiveServiceContributorRole)
  properties: {
    roleDefinitionId: cognitiveServiceContributorRole
    principalId: principal.id
    principalType: principal.type
  }
}]

output cognitiveServicesId string = cognitiveService.id
