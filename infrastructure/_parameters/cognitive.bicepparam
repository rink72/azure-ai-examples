using '../deploy-cognitive.bicep'

var namePrefix = 'rink72aistudy'

param resourceGroupName = '${namePrefix}-rgp'
param cognitiveServiceName = '${namePrefix}-cog'

param principals = [
  {
    id: 'b6cded51-31bb-4438-a7c9-4691d458cc0b'
    type: 'User'
  }
  {
    id: 'f1e435f2-387d-4b91-949f-8e5eb8ab038b'
    type: 'ServicePrincipal'
  }
]

param tags = {
  group: 'ai-study'
}
