targetScope = 'subscription'

@description('Name of the resource group for all resources')
param resourceGroupName string

@description('Name of the Azure Machine Learning workspace')
param workspaceName string

@description('Tags to apply to all resources')
param tags object

@description('Name of the Azure region to deploy all resources')
param location string = 'australiaeast'

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
    location: location
    tags: tags
  }
}
