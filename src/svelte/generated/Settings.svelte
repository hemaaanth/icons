<script>
  import MotionIcon from "../MotionIcon.svelte";
  import { settingsDefinition as definition } from "@hemaaanth/icons/core";
  let props = $props();
</script>

<MotionIcon {definition} {...props} />
