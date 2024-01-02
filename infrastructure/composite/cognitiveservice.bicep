@description('Cognitive service name')
param cognitiveServiceName string

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
    location: location
    tags: tags
  }
}
