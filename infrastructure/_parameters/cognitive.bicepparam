using '../deploy-cognitive.bicep'

var namePrefix = 'rink72aistudy'

param resourceGroupName = '${namePrefix}-rgp'
param cognitiveServiceName = '${namePrefix}-cog'
param storageAccountName = '${namePrefix}sa'

param principals = [
  {
    id: 'b6cded51-31bb-4438-a7c9-4691d458cc0b'
    type: 'User'
  }
  {
    id: 'f0424dfa-60a3-41b7-a9d0-a67ad7a914dd' // Object id of enterprise app
    type: 'ServicePrincipal'
  }
]

param tags = {
  group: 'ai-study'
}
