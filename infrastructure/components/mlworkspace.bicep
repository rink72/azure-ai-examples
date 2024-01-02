@description('Machine learning workspace name')
param name string

@description('Resource tags')
param tags object = {}

@description('Resource location')
param location string = resourceGroup().location

@description('Keyvault id')
param keyVaultId string

@description('Storage account id')
param storageAccountId string

@description('Application Insights id')
param applicationInsightsId string

resource mlWorkspace 'Microsoft.MachineLearningServices/workspaces@2023-10-01' = {
  name:  name
  tags:  tags
  location: location
  kind: 'Default'
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    keyVault: keyVaultId
    storageAccount: storageAccountId
    applicationInsights: applicationInsightsId
  }
}
