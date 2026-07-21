<script>
  import MotionIcon from "../MotionIcon.svelte";
  import { trash2Definition as definition } from "@hemaaanth/icons/core";
  let props = $props();
</script>

<MotionIcon {definition} {...props} />
