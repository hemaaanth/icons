<script>
  import MotionIcon from "../MotionIcon.svelte";
  import { penDefinition as definition } from "@hemaaanth/icons/core";
  let props = $props();
</script>

<MotionIcon {definition} {...props} />
