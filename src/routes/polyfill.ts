import { CompressionStream, DecompressionStream } from "@stardazed/streams-compression";

if (globalThis.window) {
    window.CompressionStream = CompressionStream;
    window.DecompressionStream = DecompressionStream;
}