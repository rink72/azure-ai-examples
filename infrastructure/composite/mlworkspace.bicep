@description('Workspace name')
param workspaceName string

@description('KeyVault name')
param keyVaultName string

@description('Storage account name')
param storageAccountName string

@description('Resource location')
param location string = resourceGroup().location

@description('Resource tags')
param tags object

@description('Deployment suffix')
param deploymentSuffix string = utcNow('yyyyMMddhhmmss')

module keyvault '../components/keyvault.bicep' = {
  name: '${keyVaultName}-${deploymentSuffix}'
  params: {
    name: keyVaultName
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

module mlWorkspace '../components/mlworkspace.bicep' = {
  name: '${workspaceName}-${deploymentSuffix}'
  params: {
    name: workspaceName
    location: location
    tags: tags
    keyVaultId: keyvault.outputs.keyvaultId
    storageAccountId: storageAccount.outputs.storageAccountId
  }
}
