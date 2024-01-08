@description('Cognitive service name')
param cognitiveServiceName string

@description('Storage account name')
param storageAccountName string

@description('Principals to assign Cognitive Services Contributor access')
param principals array = []

@description('Resource location')
param location string = resourceGroup().location

@description('Resource tags')
param tags object

@description('Deployment suffix')
param deploymentSuffix string = utcNow('yyyyMMddhhmmss')

module cognitiveService '../components/cognitiveservice.bicep' = {
  name: '${cognitiveServiceName}-${deploymentSuffix}'
  params: {
    name: cognitiveServiceName
    principals: principals
    location: location
    tags: tags
  }
}

module storageAccount '../components/storageaccount.bicep' = {
  name: '${storageAccountName}-${deploymentSuffix}'
  params: {
    name: storageAccountName
    location: location
    tags: tags
  }
}
