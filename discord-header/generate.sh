#!/usr/bin/env bash
# Re:CombineControl — Discord section-header image generator.
#
# Interactively builds a transparent-background PNG banner (wordmark +
# large title) sized for Discord, by rendering an SVG through resvg.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FONT_FILE="$SCRIPT_DIR/assets/Aldrich-Regular.ttf"

if [[ ! -f "$FONT_FILE" ]]; then
	echo "Missing bundled font at $FONT_FILE — run this script from within its repo checkout." >&2
	exit 1
fi

# ---------- 1. dependency check ----------

if ! command -v resvg >/dev/null 2>&1; then
	echo "This tool needs 'resvg' (an SVG-to-PNG renderer) to generate images."
	if ! command -v brew >/dev/null 2>&1; then
		echo "Homebrew isn't installed. Install it from https://brew.sh, then re-run this script." >&2
		exit 1
	fi
	read -r -p "Install resvg via Homebrew now? [Y/n] " ans
	ans=${ans:-Y}
	if [[ "$ans" =~ ^[Yy] ]]; then
		brew install resvg
	else
		echo "Cannot continue without resvg. Exiting."
		exit 1
	fi
fi

# ---------- 2. title text ----------

read -r -p "Header title text (will be capitalized) [SECTION TITLE]: " TITLE
TITLE=${TITLE:-SECTION TITLE}
TITLE=$(printf '%s' "$TITLE" | tr '[:lower:]' '[:upper:]')
# escape for safe embedding as SVG text content
ESCAPED_TITLE=$(printf '%s' "$TITLE" | sed 's/&/\&amp;/g; s/</\&lt;/g; s/>/\&gt;/g')

# ---------- 3. size ----------

read -r -p "Use Discord's standard channel-header size, 1920x480 (4:1)? [Y/n] " sizeans
sizeans=${sizeans:-Y}
if [[ "$sizeans" =~ ^[Yy] ]]; then
	WIDTH=1920
	HEIGHT=480
else
	read -r -p "Width in pixels: " WIDTH
	read -r -p "Height in pixels: " HEIGHT
	if ! [[ "$WIDTH" =~ ^[0-9]+$ ]] || ! [[ "$HEIGHT" =~ ^[0-9]+$ ]]; then
		echo "Width/height must be whole numbers." >&2
		exit 1
	fi
	echo "Note: the layout is tuned for a wide (~4:1) aspect ratio — very different ratios may look uneven."
fi

# ---------- 4. output path ----------

DEFAULT_OUT="$SCRIPT_DIR/section-header.png"
read -r -p "Save to $DEFAULT_OUT? [Y/n] " outans
outans=${outans:-Y}
if [[ "$outans" =~ ^[Yy] ]]; then
	OUT_PATH="$DEFAULT_OUT"
else
	read -r -p "Enter output path (file or directory): " OUT_PATH
	OUT_PATH="${OUT_PATH/#\~/$HOME}"
	if [[ -d "$OUT_PATH" ]]; then
		OUT_PATH="$OUT_PATH/section-header.png"
	fi
fi
mkdir -p "$(dirname "$OUT_PATH")"

# ---------- 5. build the SVG ----------

TMP_SVG="$(mktemp -t rcc-header).svg"
trap 'rm -f "$TMP_SVG"' EXIT

python3 - "$WIDTH" "$HEIGHT" "$ESCAPED_TITLE" "$TMP_SVG" "$FONT_FILE" <<'PYEOF'
import subprocess
import sys
import tempfile
import os

W, H, TITLE, OUT, FONT_FILE = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4], sys.argv[5]

# Layout is defined as fractions of W/H, tuned at the 1920x480 baseline.
logo_x = W * 0.025
logo_y = H * 0.2167
logo_font = H * 0.10
logo_stroke = H * 0.00375
logo_spacing = H * 0.0010417

title_y = H * 0.625
title_font = H * 0.3958
title_spacing = H * 0.008333

# Measure the title's real rendered width via resvg (font metrics vary too
# much to estimate reliably) and shrink to fit if it would overflow.
available = W * 0.86
measure_svg = (
	f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">'
	f'<text id="title" x="{W / 2:.2f}" y="{title_y:.2f}" text-anchor="middle" '
	f'font-family="Aldrich" font-size="{title_font:.2f}" letter-spacing="{title_spacing:.2f}" '
	f'fill="#eae7e0">{TITLE}</text></svg>'
)
measure_fd, measure_path = tempfile.mkstemp(suffix=".svg")
try:
	with os.fdopen(measure_fd, "w") as f:
		f.write(measure_svg)
	result = subprocess.run(
		["resvg", "--use-font-file", FONT_FILE, "--query-all", measure_path],
		capture_output=True, text=True,
	)
	for line in result.stdout.splitlines():
		fields = line.split(",")
		if fields and fields[0] == "title" and len(fields) >= 5:
			measured_width = float(fields[3])
			if measured_width > available > 0:
				scale = available / measured_width
				title_font *= scale
				title_spacing *= scale
			break
finally:
	os.remove(measure_path)

rule_width = W * 0.4271
rule_y = H * 0.700
rule_height = max(H * 0.008333, 2)

margin_x = W * 0.02083
margin_y = H * 0.08333
leg_x = W * 0.02917
leg_y = H * 0.11667
tri_x = W * 0.015625
tri_y = H * 0.0625
frame_stroke = max(H * 0.0041667, 1.25)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
	<defs>
		<linearGradient id="rcc-rule" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="#e2231c" stop-opacity="0" />
			<stop offset="0.5" stop-color="#e2231c" stop-opacity="1" />
			<stop offset="1" stop-color="#e2231c" stop-opacity="0" />
		</linearGradient>
	</defs>

	<polyline points="{margin_x},{margin_y + leg_y} {margin_x},{margin_y} {margin_x + leg_x},{margin_y}" fill="none" stroke="#454b4e" stroke-width="{frame_stroke}" />
	<polyline points="{W - margin_x},{H - margin_y - leg_y} {W - margin_x},{H - margin_y} {W - margin_x - leg_x},{H - margin_y}" fill="none" stroke="#454b4e" stroke-width="{frame_stroke}" />
	<polygon points="{margin_x},{margin_y} {margin_x + tri_x},{margin_y} {margin_x},{margin_y + tri_y}" fill="#e2231c" />
	<polygon points="{W - margin_x},{H - margin_y} {W - margin_x - tri_x},{H - margin_y} {W - margin_x},{H - margin_y - tri_y}" fill="#e2231c" />

	<text x="{logo_x}" y="{logo_y}" font-family="Aldrich" font-size="{logo_font:.2f}" letter-spacing="{logo_spacing:.2f}">
		<tspan fill="#e2231c">RE:</tspan><tspan fill="none" stroke="#eae7e0" stroke-width="{logo_stroke:.2f}" paint-order="stroke fill"> COMBINE</tspan><tspan fill="#e2231c"> CONTROL</tspan>
	</text>

	<text x="{W / 2:.2f}" y="{title_y:.2f}" text-anchor="middle" font-family="Aldrich" font-size="{title_font:.2f}" letter-spacing="{title_spacing:.2f}" fill="#eae7e0">{TITLE}</text>

	<rect x="{W / 2 - rule_width / 2:.2f}" y="{rule_y:.2f}" width="{rule_width:.2f}" height="{rule_height:.2f}" fill="url(#rcc-rule)" />
</svg>
'''

with open(OUT, "w") as f:
	f.write(svg)
PYEOF

# ---------- 6. render ----------

resvg --use-font-file "$FONT_FILE" -w "$WIDTH" -h "$HEIGHT" "$TMP_SVG" "$OUT_PATH"

echo "Saved $(printf '%sx%s' "$WIDTH" "$HEIGHT") header to $OUT_PATH"
