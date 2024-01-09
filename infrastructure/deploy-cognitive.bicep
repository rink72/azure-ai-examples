targetScope = 'subscription'

@description('Name of the resource group for all resources')
param resourceGroupName string

@description('Name of the Azure Cognitive Service')
param cognitiveServiceName string

@description('Name of the Azure Storage Account')
param storageAccountName string

@description('Tags to apply to all resources')
param tags object

@description('Name of the Azure region to deploy all resources')
param location string = 'australiaeast'

@description('Suffix for ARM deployment names')
param deploymentNameSuffix string = utcNow('yyyyMMddhhmmss')

@description('Principals to assign Cognitive Services Contributor access')
param principals array = []

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module cognitiveService 'composite/cognitiveservice.bicep' = {
  name: 'cognitiveService-${deploymentNameSuffix}'
  scope: resourceGroup
  params: {
    cognitiveServiceName: cognitiveServiceName
    storageAccountName: storageAccountName
    principals: principals
    location: location
    tags: tags
  }
}
