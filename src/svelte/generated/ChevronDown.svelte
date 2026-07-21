<script>
  import MotionIcon from "../MotionIcon.svelte";
  import { chevronDownDefinition as definition } from "@hemaaanth/icons/core";
  let props = $props();
</script>

<MotionIcon {definition} {...props} />
