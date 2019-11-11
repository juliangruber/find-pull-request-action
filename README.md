# find-pull-request-action

A GitHub Action for finding pull requests.

## Usage

```yaml
steps:
  - name: Find Pull Request
    uses: juliangruber/find-pull-request-action@v1
    id: find-pull-request
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
      branch: my-branch-name
  - run: echo "Your Pull Request has number ${number}"
    if: success() && steps.find-pull-request.outputs.number
    env:
      number: ${{ steps.find-pull-request.outputs.number }}
```

Currently this will find a single open PR based on given `branch` input. For more options please open an issue.

## Related

- [approve-pull-request-action](https://github.com/juliangruber/approve-pull-request-action) &mdash; Approve a Pull Request
- [merge-pull-request-action](https://github.com/juliangruber/merge-pull-request-action) &mdash; Merge a Pull Request

## License

MIT
