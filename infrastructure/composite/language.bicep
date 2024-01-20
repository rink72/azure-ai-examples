@description('Language service name')
param languageServiceName string

@description('Search service name')
param searchServiceName string

@description('Principals to assign Cognitive Services Contributor access')
param principals array = []

@description('Resource location')
param location string = resourceGroup().location

@description('Resource tags')
param tags object

@description('Deployment suffix')
param deploymentSuffix string = utcNow('yyyyMMddhhmmss')

module languageService '../components/cognitiveservice.bicep' = {
  name: '${languageServiceName}-${deploymentSuffix}'
  params: {
    name: languageServiceName
    kind: 'TextAnalytics'
    sku: 'S'
    principals: principals
    location: location
    tags: tags
  }
}

module searchService '../components/searchservice.bicep' = {
  name: '${searchServiceName}-${deploymentSuffix}'
  params: {
    name: searchServiceName
    location: location
    tags: tags
  }
}
