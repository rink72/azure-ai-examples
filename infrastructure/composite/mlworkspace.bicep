@description('Workspace name')
param workspaceName string

@description('KeyVault name')
param keyVaultName string

@description('Resource location')
param location string = resourceGroup().location

@description('Resource tags')
param tags object

module keyvault '../components/keyvault.bicep' = {
  name: keyVaultName
  params: {
    name: keyVaultName
    location: location
    tags: tags
  }
}

module mlWorkspace '../components/mlworkspace.bicep' = {
  name: workspaceName
  params: {
    name: workspaceName
    location: location
    tags: tags
    keyVaultId: keyvault.outputs.keyvaultId
  }
}
