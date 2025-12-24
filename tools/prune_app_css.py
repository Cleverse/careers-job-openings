#!/usr/bin/env python3
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
app_js_path = ROOT / "src" / "App.js"
app_css_path = ROOT / "src" / "App.css"


def extract_used_classes(js_text: str) -> set[str]:
  used: set[str] = set()

  # className="..."
  for m in re.finditer(r'className\s*=\s*"([^"]+)"', js_text):
    for token in re.findall(r"[A-Za-z0-9_-]+", m.group(1)):
      used.add(token)

  # className='...'
  for m in re.finditer(r"className\s*=\s*'([^']+)'", js_text):
    for token in re.findall(r"[A-Za-z0-9_-]+", m.group(1)):
      used.add(token)

  # className={`...`}
  for m in re.finditer(r"className\s*=\s*{?\s*`([^`]+)`", js_text):
    for token in re.findall(r"[A-Za-z0-9_-]+", m.group(1)):
      used.add(token)

  return used


def main() -> None:
  js_text = app_js_path.read_text(encoding="utf-8")
  css_text = app_css_path.read_text(encoding="utf-8")

  used_classes = extract_used_classes(js_text)

  # All class names that appear in CSS (including in compound selectors)
  defined_classes = set(re.findall(r"\.([A-Za-z0-9_-]+)", css_text))

  unused_classes = sorted(defined_classes - used_classes)

  if not unused_classes:
    print("No unused classes detected; nothing to do.")
    return

  print(f"Found {len(used_classes)} used classes and {len(unused_classes)} unused classes.")

  pruned_css = css_text
  for cls in unused_classes:
    # Remove simple rules that start with .cls (possibly with whitespace/newlines)
    # and run until the end of their declaration block.
    pattern = r"\." + re.escape(cls) + r"[^{}]*\{[^}]*\}"
    pruned_css_new = re.sub(pattern, "", pruned_css, flags=re.DOTALL)
    pruned_css = pruned_css_new

  # Collapse excessive blank lines
  pruned_css = re.sub(r"\n\s*\n\s*\n+", "\n\n", pruned_css)

  app_css_path.write_text(pruned_css, encoding="utf-8")
  print(f"Pruned App.css. Defined: {len(defined_classes)}, used: {len(used_classes)}, unused removed: {len(unused_classes)}")


if __name__ == "__main__":
  main()


