#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  # GitHub web uploads and ZIP extraction do not reliably preserve executable
  # bits. Invoke both shell scripts explicitly so Hostinger can build from
  # ordinary 0644 files.
  exec bash "${script_dir}/sites-env.sh" -- bash "$0" "$@"
fi

command -v timeout || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${vinext}" build

# Vinext writes static exports to dist/client, while Hostinger's Vite preset
# publishes dist. Stage only the browser-ready files at dist/ so Hostinger
# never tries to launch the generated server bundle.
static_source="${SITES_PROJECT_ROOT}/dist/client"
static_stage="${SITES_PROJECT_ROOT}/.hostinger-static-output"
static_output="${SITES_PROJECT_ROOT}/dist"

if [[ ! -f "${static_source}/index.html" ]]; then
  echo "Static export is missing dist/client/index.html." >&2
  exit 70
fi

rm -rf "${static_stage}"
mkdir -p "${static_stage}"
cp -a "${static_source}/." "${static_stage}/"
rm -rf "${static_output}"
mv "${static_stage}" "${static_output}"

if [[ ! -f "${static_output}/sample-report.html" ]]; then
  echo "Static export is missing dist/sample-report.html." >&2
  exit 70
fi

echo "Hostinger static output ready in dist/."
