# nbt-edit

nbt editor &amp;&amp; viewer component for the web

## polyfill

The internal library that `nbt-edit` uses, `NBTify`, uses [Compression](https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream) and [Decompression](https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream) streams.\
These are not supported in all browsers. If you are using `nbt-edit` in a browser that does not support these streams, you will need to include a polyfill.

The reccomended polyfill is [compression-streams-polyfill](https://github.com/101arrowz/compression-streams-polyfill), as it works well with SvelteKit.