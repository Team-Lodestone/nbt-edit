<script lang="ts">
    import { Viewer } from "$lib";
    import hello from "../resources/hello_world.nbt?raw"

    const data = new TextEncoder().encode(hello)
</script>

<Viewer {data} />