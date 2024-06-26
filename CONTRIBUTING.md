## Development Setup

```bash
pnpm install
```

## Development

```bash
cd packages/react-yjs
pnpm dev # runs the typescript compiler for the package
```

To run the example app:

```bash
cd examples/app
pnpm dev
```

## Testing

```bash
pnpm test
```

## Adding a new Changeset

In root run:

```bash
pnpm changeset
```

## Publishing

```bash
pnpm changeset version
pnpm release
```
