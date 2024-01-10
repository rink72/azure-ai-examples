targetScope = 'subscription'

@description('Name of the resource group for all resources')
param resourceGroupName string

@description('Name of the Azure Machine Learning workspace')
param workspaceName string

@description('Name of the Azure KeyVault')
param keyVaultName string

@description('Name of the Azure Storage Account')
param storageAccountName string

@description('Name of the Log Analytics workspace')
param logAnalyticsWorkspaceName string

@description('Name of the Application Insights resource')
param applicationInsightsName string

@description('Tags to apply to all resources')
param tags object

@description('Name of the Azure region to deploy all resources')
param location string = 'eastus'

@description('Suffix for ARM deployment names')
param deploymentNameSuffix string = utcNow('yyyyMMddhhmmss')

resource resourceGroup 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
}

module mlWorkspace 'composite/mlworkspace.bicep' = {
  name: 'mlWorkspace-${deploymentNameSuffix}'
  scope: resourceGroup
  params: {
    workspaceName: workspaceName
    keyVaultName: keyVaultName
    storageAccountName: storageAccountName
    appInsightsName: applicationInsightsName
    logAnalyticsName: logAnalyticsWorkspaceName
    location: location
    tags: tags
  }
}
