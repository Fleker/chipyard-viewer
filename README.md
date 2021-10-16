# Chipyard Viewer

[![Build Status](https://img.shields.io/github/workflow/status/Fleker/chipyard-viewer/Build?logo=github)](https://github.com/Fleker/chipyard-viewer/actions?query=workflow%3ABuild)

An online app that can visualize Chipyard-generated `.out` files.

It is available in hosted form online: https://felker.dev/chipyard-viewer

![demo.png](demo.png)

## Features

* Show Pass/Fail state clearly
* Visualize clock cycles with gaps
* Hover over each operation to see operation details
* View file text with syntax highlighting

## Setup

### Prerequisites

* Node.js >= 12.14.0

```
npm install
npm run start # Starts app on localhost
npm run build # Generates website under `/dist/app`
npm run test  # Run unit tests
```

## Examples

Examples in `/examples` largely are generated by following the [Chipyard getting started guide](https://chipyard.readthedocs.io/en/latest/Simulation/Software-RTL-Simulation.html#verilator-open-source) with default settings.

These examples are used to verify the behavior of the app through unit
tests.

# LICENSE

This is licensed under `Apache-2.0`. See [LICENSE](LICENSE).
