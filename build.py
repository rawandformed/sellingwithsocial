#!/usr/bin/env python3
"""Build the site.

Each page in src/pages/ becomes one self-contained HTML file in the repo root
(CSS, JS and logos inlined), so it can be served by any static host or pasted
whole into a GoHighLevel custom-code element.

    python3 build.py

Tokens used inside src files:
    {{> file}}        inline another file from src/
    {{img:name.png}}  inline assets/name.png as a data URI
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
ASSETS = ROOT / "assets"


def expand(text: str, depth: int = 0) -> str:
    if depth > 5:
        raise RuntimeError("includes nested too deep")

    def include(m):
        return expand((SRC / m.group(1).strip()).read_text(), depth + 1)

    def image(m):
        data = (ASSETS / m.group(1).strip()).read_bytes()
        return "data:image/png;base64," + base64.b64encode(data).decode()

    text = re.sub(r"\{\{>\s*([^}]+)\}\}", include, text)
    return re.sub(r"\{\{img:([^}]+)\}\}", image, text)


def main():
    for page in sorted((SRC / "pages").glob("*.html")):
        out = ROOT / page.name
        out.write_text(expand(page.read_text()))
        print(f"built {out.name}  ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
