@description('Log Analytics name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name:  name
  tags:  tags
  location: location
}

output logAnalyticsId string = logAnalytics.id
output logAnalyticsWorkspaceId string = logAnalytics.properties.customerId
