'use strict'

const core = require('@actions/core')
const github = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const branch = core.getInput('branch')
  const base = core.getInput('base')
  const author = core.getInput('author')
  const state = core.getInput('state')
  const sort = core.getInput('sort')
  const direction = core.getInput('direction')
  const repoString = core.getInput('repo')

  let repoObject
  if (repoString) {
    const [owner, repo] = repoString.split('/')
    repoObject = { owner, repo }
  } else {
    repoObject = github.context.repo
  }

  const query = {
    ...repoObject,
    state
  }
  if (branch) {
    query.head =
      branch.indexOf(':') === -1
        ? `${github.context.repo.owner}:${branch}`
        : branch
  }
  if (base) {
    query.base = base
  }
  if (sort) {
    query.sort = sort
  }
  if (direction) {
    query.direction = direction
  }

  const octokit = github.getOctokit(token)

  const res = await octokit.rest.pulls.list(query)
  const pr = author
    ? res.data.length && res.data.filter(pr => pr.user.login === author)[0]
    : res.data.length && res.data[0]

  core.debug(`pr: ${JSON.stringify(pr, null, 2)}`)
  core.setOutput('number', pr ? pr.number : '')
  core.setOutput('title', pr ? pr.title : '')
  core.setOutput('url', pr ? pr.url : '')
  core.setOutput('head-ref', pr ? pr.head.ref : '')
  core.setOutput('head-sha', pr ? pr.head.sha : '')
  core.setOutput('base-ref', pr ? pr.base.ref : '')
  core.setOutput('base-sha', pr ? pr.base.sha : '')
  core.setOutput('base-repo', pr ? pr.base.repo.full_name : '')
  core.setOutput('state', pr ? pr.state : '')
}

main().catch(err => core.setFailed(err.message))
