# Reddit Global Popular

A small, open source Chrome extension that adds `geo_filter=global` to Reddit's Popular links. It keeps the global feed selected when you use the Popular sidebar link or switch between Best, Hot, New, Top, and Rising.

The extension edits links in the page as Reddit adds or changes them. It does not force a navigation or reload the page. URLs typed directly into the address bar are not changed.

## Install

### From a GitHub release

1. Download the `reddit-global-popular-*.zip` asset from the [latest release](https://github.com/yashrajchhabra/Reddit-Global-Popular/releases/latest) and unzip it.
2. Open `chrome://extensions` in Chrome and enable **Developer mode**.
3. Click **Load unpacked** and select the extracted folder containing `manifest.json`.

Until a Chrome Web Store listing is available, Chrome requires Developer mode for this installation method.

### From source

Clone this repository and select its root folder with **Load unpacked**. After pulling updates, click **Reload** on the extension's card in `chrome://extensions`.

## How it works

The content script checks Reddit anchors whose path is `/r/popular` or starts with `/r/popular/`. It adds or replaces `geo_filter=global`, preserving other query parameters and fragments. A `MutationObserver` catches links Reddit renders later, and a click listener checks links once more before navigation. The extension does not collect, store, or send user data.

## Build a release ZIP

Run `./scripts/package.sh`. It creates a versioned ZIP in `dist/` with `manifest.json` at the archive root. This is the same package format used for a GitHub release or a [Chrome Web Store upload](https://developer.chrome.com/docs/webstore/publish).

## Contributing

Issues and pull requests are welcome. For behavior changes, include a short description of the Reddit URL or link involved and how to reproduce it.

## License

The extension code is [MIT licensed](LICENSE). Reddit's Popular icon and the PNGs rendered from it are excluded from that license; see [NOTICE](NOTICE). This project is not affiliated with Reddit.
