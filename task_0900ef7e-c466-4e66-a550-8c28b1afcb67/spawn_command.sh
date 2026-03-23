#!/bin/bash
# Spawn command used by Programmer Agent for task 0900ef7e-c466-4e66-a550-8c28b1afcb67
# Invokes DaemonAgent spawn_cube (via KĀDI tool) — executed by agent runtime

# Parameters:
# position: [0,0,0]
# color: converted from #2E5A88 to r=46 g=90 b=136 a=255

echo "spawn_cube --position '[0,0,0]' --color '{\"r\":46,\"g\":90,\"b\":136,\"a\":255}'"

# Note: This script is an artifact showing the exact spawn call used by the agent.
# The actual spawn was executed via the DaemonAgent tool in the runtime environment.
