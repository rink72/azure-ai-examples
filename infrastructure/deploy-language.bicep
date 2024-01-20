targetScope = 'subscription'

@description('Name of the resource group for all resources')
param resourceGroupName string

@description('Name of the Azure Language service')
param languageServiceName string

@description('Name of the Azure Search service')
param searchServiceName string

@description('Tags to apply to all resources')
param tags object

@description('Name of the Azure region to deploy all resources')
param location string = 'eastus'

@description('Suffix for ARM deployment names')
param deploymentNameSuffix string = utcNow('yyyyMMddhhmmss')

@description('Principals to assign Cognitive Services Contributor access')
param principals array = []

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module languageService 'composite/language.bicep' = {
  name: 'languageService-${deploymentNameSuffix}'
  scope: resourceGroup
  params: {
    languageServiceName: languageServiceName
    searchServiceName: searchServiceName
    principals: principals
    location: location
    tags: tags
  }
}
