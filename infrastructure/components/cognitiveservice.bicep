@description('Cognitive service name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

@description('Kind of cognitive service')
param kind string

@description('Cognitive service sku')
param sku string = 'S0'

@description('Principals to assign Cognitive Services access')
param principals array = []

@description('Cognitive Services Contributor role definition id')
param cognitiveServiceContributorRole string = '/providers/Microsoft.Authorization/roleDefinitions/25fbc0a9-bd7c-42a3-aa1a-3b75d497ee68'

@description('Cognitive Services User role definition id')
param cognitiveServiceUserRole string = '/providers/Microsoft.Authorization/roleDefinitions/a97b65f3-24c7-4388-baec-2e87135dc908'

resource cognitiveService 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: name
  tags: tags
  location: location
  kind: kind
  sku: {
    name: sku
  }
  properties: {
    customSubDomainName: toLower(name)
    disableLocalAuth: true
  }
}

resource contributorRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for principal in principals: {
  scope: cognitiveService
  name: guid(cognitiveService.id, principal.id, cognitiveServiceContributorRole)
  properties: {
    roleDefinitionId: cognitiveServiceContributorRole
    principalId: principal.id
    principalType: principal.type
  }
}]

resource userRoleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for principal in principals: {
  scope: cognitiveService
  name: guid(cognitiveService.id, principal.id, cognitiveServiceUserRole)
  properties: {
    roleDefinitionId: cognitiveServiceUserRole
    principalId: principal.id
    principalType: principal.type
  }
}]

output cognitiveServicesId string = cognitiveService.id
