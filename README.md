# find-pull-request-action

A GitHub Action for finding pull requests.

## Usage

```yaml
steps:
  - name: Find Pull Request
    uses: juliangruber/find-pull-request-action@v1
    id: find-pull-request
    with:
      branch: my-branch-name
  - run: echo "Pull Request ${number} (${sha})"
    env:
      number: ${{ steps.find-pull-request.outputs.number }}
      sha: ${{ steps.find-pull-request.outputs.head-sha }}
```

Query pull requests based on these inputs:
- `branch`
- `base`
- `author`
- `state`
- `repo`
- `sort`
- `direction`
- `labels`

The first matching pull request will be returned. See [action.yml](blob/master/action.yml) for more details.

## Related

- [approve-pull-request-action](https://github.com/juliangruber/approve-pull-request-action) &mdash; Approve a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request
- [octokit-action](https://github.com/juliangruber/octokit-action) &mdash; Generic Octokit.js Action

## License

MIT
