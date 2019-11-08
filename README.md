# find-pull-request-action

A GitHub Action for finding pull requests.

## Usage

```yaml
steps:
  - uses: juliangruber/find-pull-request-action@v1
    id: find-pull-request
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
  - run: echo "Your Pull Request has number ${number}"
    if: success() && steps.find-pull-request.outputs.number
    env:
      PR: ${{ steps.find-pull-request.outputs.number }}
```

## License

MIT
