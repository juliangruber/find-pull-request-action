'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const branch = core.getInput('branch')

  const octokit = new GitHub(token)

  const res = await octokit.pulls.list({
    ...context.repo,
    state: 'open',
    head: `${context.repo.owner}:${branch}`
  })

  const pr = res.data.length && res.data[0]

  core.setOutput('number', pr ? pr.number : '')
  core.setOutput('head-sha', pr ? pr.head.sha : '')
}

main().catch(err => core.setFailed(err.message))
