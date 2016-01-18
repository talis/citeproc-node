# citeproc-node

## install

```bash
$ git clone --recursive git@github.com:talis/citeproc-node.git
$ grunt init
```

#### Usage

(from top level directory)

```bash
$ grunt createEvent:harvard-cite-them-right lambda_invoke:harvard-cite-them-right
```

#### Run a test over all used citation styles

```bash
$ grunt test
```

#### Build distribution

```bash
$ grunt dist
```

#### Deploy to AWS Lambda

```bash
$ grunt deploy --arn='arn:aws:lambda:eu-west-1:123456789012:function:citeproc'
```

#### Running locally

```bash
$ PORT=8181 node api-gateway.js

// In another terminal
$ curl -d "{\"items\":[{...},{...}]}" -v -X POST -H "Content-Type:application/json" http://localhost:8181/api/
```