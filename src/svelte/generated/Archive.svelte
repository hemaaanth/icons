<script>
  import MotionIcon from "../MotionIcon.svelte";
  import { archiveDefinition as definition } from "@hemaaanth/icons/core";
  let props = $props();
</script>

<MotionIcon {definition} {...props} />
