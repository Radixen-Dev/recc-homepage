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

# ---------- 3. logo size ----------

read -r -p "Use the default logo size? [Y/n] " logoans
logoans=${logoans:-Y}
if [[ "$logoans" =~ ^[Yy] ]]; then
	LOGO_SCALE=1.0
else
	read -r -p "Logo scale factor relative to default (e.g. 0.75 smaller, 1.5 larger) [1.0]: " LOGO_SCALE
	LOGO_SCALE=${LOGO_SCALE:-1.0}
	if ! [[ "$LOGO_SCALE" =~ ^[0-9]*\.?[0-9]+$ ]]; then
		echo "Logo scale must be a number." >&2
		exit 1
	fi
fi

# ---------- 4. size ----------

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

# ---------- 5. output path ----------

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

# ---------- 6. build the SVG ----------

TMP_SVG="$(mktemp -t rcc-header).svg"
trap 'rm -f "$TMP_SVG"' EXIT

python3 - "$WIDTH" "$HEIGHT" "$ESCAPED_TITLE" "$TMP_SVG" "$FONT_FILE" "$LOGO_SCALE" <<'PYEOF'
import subprocess
import sys
import tempfile
import os

W, H, TITLE, OUT, FONT_FILE, LOGO_SCALE = (
	int(sys.argv[1]), int(sys.argv[2]), sys.argv[3], sys.argv[4], sys.argv[5], float(sys.argv[6]),
)

# Ratios are relative to font-size unless noted, so scaling either element
# scales its own spacing/stroke consistently.
LOGO_FONT_H_RATIO = 0.12  # default logo font-size, as a fraction of H
LOGO_STROKE_RATIO = 0.045  # "COMBINE" outline thickness, relative to logo font-size
LOGO_SPACING_RATIO = 0.010417
TITLE_SPACING_RATIO = 0.02106

TOP_MARGIN_RATIO = 0.09  # blank space above the logo
GAP_RATIO = 0.045  # blank space between logo and title
BOTTOM_RESERVE_RATIO = 0.155  # space below the title reserved for the rule + frame margin
MIN_TITLE_FONT_RATIO = 0.08  # never shrink the title below this fraction of H

logo_font = H * LOGO_FONT_H_RATIO * LOGO_SCALE
logo_stroke = logo_font * LOGO_STROKE_RATIO
logo_spacing = logo_font * LOGO_SPACING_RATIO

FONT_FILE_ARG = ["--use-font-file", FONT_FILE]
REF = 200.0  # reference font-size used to measure the title's per-unit metrics
MEASURE_W, MEASURE_H, MEASURE_Y = max(W, 4000), 3000, 1500.0


def query(svg_body):
	fd, path = tempfile.mkstemp(suffix=".svg")
	try:
		with os.fdopen(fd, "w") as f:
			f.write(
				f'<svg xmlns="http://www.w3.org/2000/svg" '
				f'viewBox="0 0 {MEASURE_W} {MEASURE_H}" width="{MEASURE_W}" height="{MEASURE_H}">'
				f"{svg_body}</svg>"
			)
		result = subprocess.run(
			["resvg", *FONT_FILE_ARG, "--query-all", path], capture_output=True, text=True,
		)
		boxes = {}
		for line in result.stdout.splitlines():
			fields = line.split(",")
			if len(fields) >= 5:
				boxes[fields[0]] = tuple(float(v) for v in fields[1:5])
		return boxes
	finally:
		os.remove(path)


# Measure the logo at its real (final) size, and the title at a fixed
# reference size — text metrics scale linearly with font-size, so the
# reference measurement gives us per-unit ascent/descent/width ratios
# we can solve the ideal title font-size from directly.
boxes = query(
	f'<text id="logo" x="{MEASURE_W / 2:.2f}" y="{MEASURE_Y:.2f}" text-anchor="middle" '
	f'font-family="Aldrich" font-size="{logo_font:.2f}" letter-spacing="{logo_spacing:.2f}">'
	f'<tspan>RE:</tspan><tspan stroke-width="{logo_stroke:.2f}"> COMBINE</tspan><tspan> CONTROL</tspan></text>'
	f'<text id="title" x="{MEASURE_W / 2:.2f}" y="{MEASURE_Y:.2f}" text-anchor="middle" '
	f'font-family="Aldrich" font-size="{REF:.2f}" letter-spacing="{REF * TITLE_SPACING_RATIO:.2f}">{TITLE}</text>'
)

_, logo_by, _, logo_bh = boxes["logo"]
logo_ascent = MEASURE_Y - logo_by
logo_descent = (logo_by + logo_bh) - MEASURE_Y

_, title_by, title_bw, title_bh = boxes["title"]
title_ascent_ratio = (MEASURE_Y - title_by) / REF
title_descent_ratio = ((title_by + title_bh) - MEASURE_Y) / REF
title_width_ratio = title_bw / REF

logo_y = TOP_MARGIN_RATIO * H + logo_ascent
logo_bottom = logo_y + logo_descent
title_top = logo_bottom + GAP_RATIO * H

title_font_by_height = (
	(H * (1 - BOTTOM_RESERVE_RATIO) - title_top) / (title_ascent_ratio + title_descent_ratio)
)
title_font_by_width = (W * 0.86) / title_width_ratio if title_width_ratio > 0 else title_font_by_height
title_font = max(min(title_font_by_height, title_font_by_width), H * MIN_TITLE_FONT_RATIO)
title_spacing = title_font * TITLE_SPACING_RATIO

title_y = title_top + title_ascent_ratio * title_font

rule_width = W * 0.4271
rule_y = title_y + title_font * 0.19
rule_height = max(H * 0.008333, 2)

# When the title is width- rather than height-constrained, the block above
# won't fill the reserved height — re-center the whole composition (logo,
# title, rule) vertically instead of leaving it pinned to the top.
block_top = logo_y - logo_ascent
block_bottom = rule_y + rule_height
offset = (H - (block_bottom - block_top)) / 2 - block_top
logo_y += offset
title_y += offset
rule_y += offset

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

	<text x="{W / 2:.2f}" y="{logo_y:.2f}" text-anchor="middle" font-family="Aldrich" font-size="{logo_font:.2f}" letter-spacing="{logo_spacing:.2f}">
		<tspan fill="#e2231c">RE:</tspan><tspan fill="none" stroke="#eae7e0" stroke-width="{logo_stroke:.2f}" paint-order="stroke fill"> COMBINE</tspan><tspan fill="#e2231c"> CONTROL</tspan>
	</text>

	<text x="{W / 2:.2f}" y="{title_y:.2f}" text-anchor="middle" font-family="Aldrich" font-size="{title_font:.2f}" letter-spacing="{title_spacing:.2f}" fill="#eae7e0">{TITLE}</text>

	<rect x="{W / 2 - rule_width / 2:.2f}" y="{rule_y:.2f}" width="{rule_width:.2f}" height="{rule_height:.2f}" fill="url(#rcc-rule)" />
</svg>
'''

with open(OUT, "w") as f:
	f.write(svg)
PYEOF

# ---------- 7. render ----------

resvg --use-font-file "$FONT_FILE" -w "$WIDTH" -h "$HEIGHT" "$TMP_SVG" "$OUT_PATH"

echo "Saved $(printf '%sx%s' "$WIDTH" "$HEIGHT") header to $OUT_PATH"
