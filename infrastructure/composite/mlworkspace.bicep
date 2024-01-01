@description('Workspace name')
param workspaceName string

@description('Resource location')
param location string = resourceGroup().location

@description('Resource tags')
param tags object

module mlWorkspace '../components/mlworkspace.bicep' = {
  name: workspaceName
  params: {
    name: workspaceName
    location: location
    tags: tags
  }
}
