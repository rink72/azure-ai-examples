using '../deploy.bicep'

var namePrefix = 'ai-study'

param resourceGroupName = '${namePrefix}-rgp'
param workspaceName = '${namePrefix}-ml'
param keyVaultName = '${namePrefix}-kv'
param tags = {
  group: 'ai-study'
}
