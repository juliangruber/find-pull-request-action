'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const branch = core.getInput('branch')
  const base = core.getInput('base')
  
  const query = {
    ...context.repo,
    state: 'open'
  }
  if (branch) {
    query.head = `${context.repo.owner}:${branch}`
  }
  if (base) {
    query.base = base
  }

  const octokit = new GitHub(token)

  const res = await octokit.pulls.list(query)
  const pr = res.data.length && res.data[0]

  core.debug(`pr: ${JSON.stringify(pr, null, 2)}`)
  core.setOutput('number', pr ? pr.number : '')
  core.setOutput('head-sha', pr ? pr.head.sha : '')
}

main().catch(err => core.setFailed(err.message))
