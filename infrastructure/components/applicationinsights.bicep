@description('Application Insights name')
param name string

@description('Application Insights workspace resource id')
param workspaceResourceId string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: name
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    Flow_Type: 'Redfield'
    WorkspaceResourceId: workspaceResourceId
  }
}

output applicationInsightsResourceId string = applicationInsights.id
